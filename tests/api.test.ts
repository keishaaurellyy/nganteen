import { beforeEach, describe, expect, it } from "@jest/globals";
import type { jest as Jest } from "@jest/globals";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";
import { GET as getOrders } from "@/app/api/orders/route";
import { GET as getActiveOrder } from "@/app/api/orders/active/route";
import { POST as createOrder } from "@/app/api/buyers/[id]/orders/route";
import { PATCH as patchOrderStatus } from "@/app/api/orders/[id]/status/route";
import { authOptions } from "@/lib/auth-option";
import { PATCH as patchKitchenStatus } from "@/app/api/kitchens/[id]/status/route";
import { GET as getKitchens } from "@/app/api/kitchens/route";
import { GET as getBuyer, PATCH as patchBuyer } from "@/app/api/buyers/[id]/route";
import { GET as getMe } from "@/app/api/auth/me/route";
import { GET as getKitchen, PATCH as patchKitchen } from "@/app/api/kitchens/[id]/route";

// The global jest, not the @jest/globals import: next/jest only hoists jest.mock for the global.
declare const jest: typeof Jest;

type Query = { text: string };
const mockQuery = jest.fn<(query: Query, params?: unknown[]) => Promise<{ rows: unknown[][] }>>();

// Only the pg connection is faked, so drizzle still builds the real SQL.
// Rows come back as arrays in column order, like pg's rowMode: "array".
jest.mock("pg", () => {
  const actual = jest.requireActual<typeof import("pg")>("pg");
  const Pool = jest.fn(() => ({
    query: (query: Query, params?: unknown[]) => mockQuery(query, params),
  }));
  return { __esModule: true, ...actual, Pool, default: { ...actual, Pool } };
});

let session: { user: Record<string, string> } | null = null;
const asBuyer = (id: number) => (session = { user: { id: String(id), role: "buyer", buyer_id: String(id) } });
const asKitchen = (id: number) => (session = { user: { id: String(id), role: "kitchen", kitchen_id: String(id) } });
const asAdmin = () => (session = { user: { id: "admin-id", role: "admin" } });

jest.mock("next-auth", () => ({
  __esModule: true,
  default: () => () => {},
  getServerSession: async () => session,
}));

// Answers each query by the first pattern its SQL matches; anything else gets no rows.
const respond = (answers: [RegExp, unknown[][]][]) =>
  mockQuery.mockImplementation(async (query) => ({
    rows: answers.find(([pattern]) => pattern.test(query.text))?.[1] ?? [],
  }));
const sqlRan = (pattern: RegExp) => mockQuery.mock.calls.filter(([q]) => pattern.test(q.text));

const lastSql = () => mockQuery.mock.calls.at(-1)![0].text;
const lastParams = () => mockQuery.mock.calls.at(-1)![1];

const params = (id: string | number) => ({ params: Promise.resolve({ id: String(id) }) });
const json = (url: string, method: string, body?: unknown) =>
  new NextRequest(`http://localhost${url}`, {
    method,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

beforeEach(() => {
  mockQuery.mockReset();
  mockQuery.mockResolvedValue({ rows: [] });
  asAdmin();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("GET /api/orders", () => {
  it("returns all orders mapped to schema field names", async () => {
    mockQuery.mockResolvedValueOnce({
      rows: [[7, 1, 2, null, 30000, "INCOMING", "2025-06-01 10:00:00", "ORD-7"]],
    });

    const res = await getOrders();

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      success: true,
      data: [
        {
          orderId: 7,
          buyerId: 1,
          kitchenId: 2,
          notes: null,
          totalPayment: 30000,
          status: "INCOMING",
          createdDate: "2025-06-01 10:00:00",
          orderCode: "ORD-7",
        },
      ],
    });
    expect(lastSql()).toBe(
      'select "order_id", "buyer_id", "kitchen_id", "notes", "total_payment", "status", "created_date", "order_code" from "orders"'
    );
  });

  it("returns 500 when the database fails", async () => {
    mockQuery.mockRejectedValueOnce(new Error("connection refused"));

    const res = await getOrders();

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ success: false, error: "Failed to fetch orders" });
  });
});

describe("NextAuth credentials login", () => {
  const authorize = (email: string, password: string) =>
    (authOptions.providers[0] as any).options.authorize({ email, password });
  const kitchenWithPassword = (password: string) => [
    1, "dapur@binus.ac.id", password, "Dapur Bu Ani", "Ani", "081234567890", "Kantin A", "ACTIVE", null, false,
  ];

  it("logs a kitchen in only with the bcrypt-hashed password", async () => {
    const hash = await bcrypt.hash("dapur123", 4);
    respond([[/from "kitchens"/, [kitchenWithPassword(hash)]]]);

    expect(await authorize("dapur@binus.ac.id", "dapur123")).toMatchObject({ role: "kitchen", kitchen_id: "1" });
    expect(await authorize("dapur@binus.ac.id", "salah123")).toBeNull();
  });

  it("no longer accepts a plain-text kitchen password", async () => {
    respond([[/from "kitchens"/, [kitchenWithPassword("dapur123")]]]);

    expect(await authorize("dapur@binus.ac.id", "dapur123")).toBeNull();
  });

  it("checks the admin password against ADMIN_PASSWORD_HASH", async () => {
    process.env.ADMIN_PASSWORD_HASH = await bcrypt.hash("adminBaru!9", 4);

    expect(await authorize("nganteen.binus@gmail.com", "adminBaru!9")).toMatchObject({ role: "admin" });
    expect(await authorize("nganteen.binus@gmail.com", "nganteenADMIN123")).toBeNull();

    delete process.env.ADMIN_PASSWORD_HASH;
    expect(await authorize("nganteen.binus@gmail.com", "adminBaru!9")).toBeNull();
  });

  it("passes SQL-looking input as a bound parameter", async () => {
    const email = "x' OR '1'='1";

    await authorize(email, "rahasia1");

    expect(lastSql()).not.toContain(email);
    expect(lastParams()).toEqual([email]);
  });
});

// Column order of kitchens without kitchen_password.
const kitchenRow = [1, "dapur@binus.ac.id", "Dapur Bu Ani", "Ani", "081234567890", "Kantin A", "INACTIVE", null, false];

describe("kitchen responses never include the password", () => {
  const params = { params: Promise.resolve({ id: "1" }) };
  const request = (body?: unknown) =>
    new NextRequest("http://localhost/api/kitchens/1", {
      method: body ? "PATCH" : "GET",
      body: body ? JSON.stringify(body) : undefined,
    });

  it.each([
    ["GET /api/kitchens", () => getKitchens()],
    ["GET /api/kitchens/[id]", () => getKitchen(request(), params)],
    ["PATCH /api/kitchens/[id]", () => patchKitchen(request({ kitchen_password: "baru12345" }), params)],
    ["PATCH /api/kitchens/[id]/status", () =>
      patchKitchenStatus(request({ status: "INACTIVE" }), params)],
  ])("%s", async (_, call) => {
    mockQuery.mockResolvedValueOnce({ rows: [kitchenRow] });

    const res = await call();
    const body = JSON.stringify(await res.json());

    expect(res.status).toBe(200);
    expect(body).toContain("Dapur Bu Ani");
    expect(body).not.toMatch(/password/i);
    // The password may be written (set ... = $n) but never read back.
    expect(lastSql()).not.toMatch(/(select|returning).*kitchen_password/);
  });
});

describe("buyer responses never include the password hash", () => {
  // Column order of buyers without password.
  const row = [3, "Budi", null, "081234567890", null, "BINUS_ALAM_SUTERA", "budi@binus.ac.id"];
  const params = { params: Promise.resolve({ id: "3" }) };
  const request = (body?: unknown) =>
    new NextRequest("http://localhost/api/buyers/3", {
      method: body ? "PATCH" : "GET",
      body: body ? JSON.stringify(body) : undefined,
    });

  it.each([
    ["GET /api/buyers/[id]", () => getBuyer(request(), params)],
    ["PATCH /api/buyers/[id]", () => patchBuyer(request({ password: "baru12345" }), params)],
    ["GET /api/auth/me", () => getMe()],
  ])("%s", async (_, call) => {
    asBuyer(3);
    respond([[/^select .* from "buyers"|^update "buyers"/, [row]]]);

    const res = await call();
    const body = JSON.stringify(await res.json());

    expect(res.status).toBe(200);
    expect(body).toContain("budi@binus.ac.id");
    expect(body).not.toMatch(/password/i);
    // The hash may be written (set ... = $n) but never read back.
    expect(lastSql()).not.toMatch(/(select|returning).*"password"/);
  });
});

describe("PATCH /api/kitchens/[id]/status", () => {
  const patch = (id: string, body: unknown) =>
    patchKitchenStatus(
      new Request("http://localhost/api/kitchens/x/status", {
        method: "PATCH",
        body: JSON.stringify(body),
      }),
      { params: Promise.resolve({ id }) }
    );

  it("rejects a non-numeric id", async () => {
    expect((await patch("abc", { status: "ACTIVE" })).status).toBe(400);
    expect(mockQuery).not.toHaveBeenCalled();
  });

  it("rejects an unknown status", async () => {
    expect((await patch("1", { status: "CLOSED" })).status).toBe(400);
    expect(mockQuery).not.toHaveBeenCalled();
  });

  it("updates the status and returns the kitchen", async () => {
    mockQuery.mockResolvedValueOnce({
      rows: [
        kitchenRow,
      ],
    });

    const res = await patch("1", { status: "INACTIVE" });

    expect(res.status).toBe(200);
    expect((await res.json()).data).toMatchObject({
      kitchenId: 1,
      kitchenName: "Dapur Bu Ani",
      status: "INACTIVE",
      isBusy: false,
    });
    expect(lastSql()).toContain('update "kitchens" set "status" = $1 where "kitchens"."kitchen_id" = $2');
    expect(lastParams()).toEqual(["INACTIVE", 1]);
  });

  it("returns 404 when no kitchen matches", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] });

    expect((await patch("99", { status: "ACTIVE" })).status).toBe(404);
  });
});


describe("API access control", () => {
  it("rejects visitors without a session before touching the database", async () => {
    session = null;

    expect((await getOrders()).status).toBe(401);
    expect(mockQuery).not.toHaveBeenCalled();
  });

  it("keeps the full order list for admins", async () => {
    asBuyer(3);
    expect((await getOrders()).status).toBe(403);
  });

  it("stops a buyer from reading another buyer's active order", async () => {
    asBuyer(3);
    const res = await getActiveOrder(json("/api/orders/active?buyerId=4", "GET"));
    expect(res.status).toBe(403);
  });

  it("stops a kitchen from changing another kitchen's status", async () => {
    asKitchen(2);
    const res = await patchKitchenStatus(json("/api/kitchens/1/status", "PATCH", { status: "INACTIVE" }), params(1));
    expect(res.status).toBe(403);
  });

  it.each([
    ["the buyer themself", () => asBuyer(3), 200],
    ["another buyer", () => asBuyer(4), 403],
    ["a kitchen the buyer ordered from", () => asKitchen(1), 200],
    ["any other kitchen", () => asKitchen(2), 403],
  ])("lets %s read a buyer's profile: %s", async (_, signIn, status) => {
    signIn();
    respond([
      [/^select distinct .* from "orders"/, [[1]]],
      [/from "buyers"/, [[3, "Budi", null, "081234567890", null, "BINUS_ALAM_SUTERA", "budi@binus.ac.id"]]],
    ]);

    expect((await getBuyer(json("/api/buyers/3", "GET"), params(3))).status).toBe(status);
  });
});

describe("POST /api/buyers/[id]/orders", () => {
  // The browser claims nasi goreng costs Rp1; the database says Rp15.000.
  const order = (items = [{ item_id: 5, item_name: "Nasi Goreng", item_price: 1, item_qty: 2, total_item_price: 2 }]) =>
    createOrder(json("/api/buyers/3/orders", "POST", { kitchen_id: 1, items, total_payment: 2 }), params(3));

  beforeEach(() => {
    asBuyer(3);
  });

  it("prices the order from the database inside one transaction", async () => {
    respond([
      [/from "kitchens"/, [["ACTIVE"]]],
      [/^update "items"/, [["Nasi Goreng", 15000]]],
      [/^insert into "orders"/, [[42]]],
    ]);

    const res = await order();

    expect(res.status).toBe(200);
    expect((await res.json()).data).toEqual({ orderId: 42 });
    const [[insertOrder, orderParams]] = sqlRan(/^insert into "orders"/);
    expect(orderParams).toContain(30000);
    expect(orderParams).not.toContain(2);
    expect(sqlRan(/^insert into "order_items"/)[0][1]).toEqual([42, 5, "Nasi Goreng", 15000, 2, 30000]);
    expect(insertOrder.text).toBeTruthy();
    expect(sqlRan(/^begin/)).toHaveLength(1);
    expect(sqlRan(/^commit/)).toHaveLength(1);
  });

  it("only takes stock while enough is left, for this kitchen's item", async () => {
    respond([[/from "kitchens"/, [["ACTIVE"]]]]);

    const res = await order();

    expect(res.status).toBe(400);
    expect((await res.json()).error).toMatch(/exceeds available stock/);
    const [[update, updateParams]] = sqlRan(/^update "items"/);
    expect(update.text).toMatch(/"item_stock" >= \$\d/);
    expect(update.text).toMatch(/"kitchen_id" = \$\d/);
    expect(updateParams).toEqual([2, 5, 1, 2]);
    expect(sqlRan(/^insert/)).toHaveLength(0);
    expect(sqlRan(/^rollback/)).toHaveLength(1);
  });

  it("rejects the same item twice", async () => {
    const line = { item_id: 5, item_name: "Nasi Goreng", item_price: 1, item_qty: 1, total_item_price: 1 };
    expect((await order([line, line])).status).toBe(400);
    expect(mockQuery).not.toHaveBeenCalled();
  });

  it("does not let one buyer order on another buyer's account", async () => {
    asBuyer(4);
    expect((await order()).status).toBe(403);
  });
});

describe("PATCH /api/orders/[id]/status", () => {
  // Columns of orders in table order.
  const orderRow = (status: string) => [9, 3, 1, null, 30000, status, "2025-06-01 10:00:00", "TRX000009"];
  const patch = (status: string) =>
    patchOrderStatus(json("/api/orders/9/status", "PATCH", { status }), params(9));
  const current = (status: string, updated = true) =>
    respond([
      [/^select "status", "buyer_id", "kitchen_id" from "orders"/, [[status, 3, 1]]],
      [/^update "orders"/, updated ? [orderRow("NEW")] : []],
      [/from "order_items"/, [[5, 2]]],
    ]);

  it("puts stock back when the kitchen cancels", async () => {
    asKitchen(1);
    current("INCOMING");

    expect((await patch("CANCELLED")).status).toBe(200);
    const [[statusUpdate, statusParams]] = sqlRan(/^update "orders"/);
    expect(statusUpdate.text).toMatch(/"orders"."status" = \$\d/);
    expect(statusParams).toEqual(["CANCELLED", 9, "INCOMING"]);
    const [[stockUpdate, stockParams]] = sqlRan(/^update "items"/);
    expect(stockUpdate.text).toContain('"item_stock" + $1');
    expect(stockParams).toEqual([2, 5]);
  });

  it("returns stock only once if the status changed meanwhile", async () => {
    asKitchen(1);
    current("INCOMING", false);

    expect((await patch("CANCELLED")).status).toBe(409);
    expect(sqlRan(/^update "items"/)).toHaveLength(0);
  });

  it("lets the buyer complete a cooking order without touching stock", async () => {
    asBuyer(3);
    current("COOKING");

    expect((await patch("COMPLETED")).status).toBe(200);
    expect(sqlRan(/^update "items"/)).toHaveLength(0);
  });

  it.each([
    ["buyer", () => asBuyer(3), "INCOMING", "COOKING"],
    ["buyer", () => asBuyer(3), "COOKING", "CANCELLED"],
    ["kitchen", () => asKitchen(1), "COMPLETED", "INCOMING"],
    ["kitchen", () => asKitchen(1), "CANCELLED", "COOKING"],
  ])("refuses a %s moving %s to %s", async (_, signIn, from, to) => {
    signIn();
    current(from);

    expect((await patch(to)).status).toBe(409);
    expect(sqlRan(/^update/)).toHaveLength(0);
  });

  it("refuses other kitchens and buyers", async () => {
    current("INCOMING");
    asKitchen(2);
    expect((await patch("CANCELLED")).status).toBe(403);
    asBuyer(4);
    expect((await patch("COMPLETED")).status).toBe(403);
  });
});
