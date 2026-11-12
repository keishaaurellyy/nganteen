import { beforeEach, describe, expect, it } from "@jest/globals";
import type { jest as Jest } from "@jest/globals";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";
import { GET as getOrders } from "@/app/api/orders/route";
import { POST as login } from "@/app/api/login/route";
import { PATCH as patchKitchenStatus } from "@/app/api/kitchens/[id]/status/route";

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

const lastSql = () => mockQuery.mock.calls.at(-1)![0].text;
const lastParams = () => mockQuery.mock.calls.at(-1)![1];

const post = (body: unknown) =>
  new NextRequest("http://localhost/api/login", {
    method: "POST",
    body: JSON.stringify(body),
  });

beforeEach(() => {
  mockQuery.mockReset();
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

describe("POST /api/login", () => {
  const buyerRow = async (password: string) => [
    3,
    "Budi",
    null,
    "081234567890",
    null,
    "BINUS_ALAM_SUTERA",
    "budi@binus.ac.id",
    await bcrypt.hash(password, 4),
  ];

  it("rejects missing fields without touching the database", async () => {
    const res = await login(post({ email: "budi@binus.ac.id" }));

    expect(res.status).toBe(400);
    expect(mockQuery).not.toHaveBeenCalled();
  });

  it("rejects an unknown role", async () => {
    const res = await login(post({ email: "a@b.c", password: "x", role: "admin" }));

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Invalid role." });
  });

  it("logs a buyer in with the right password", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [await buyerRow("rahasia1")] });

    const res = await login(
      post({ email: "budi@binus.ac.id", password: "rahasia1", role: "buyer" })
    );

    expect(res.status).toBe(200);
    expect((await res.json()).user).toEqual({
      id: 3,
      name: "Budi ",
      email: "budi@binus.ac.id",
      role: "buyer",
      buyer_id: "3",
    });
    expect(lastSql()).toContain('from "buyers" where "buyers"."university_email" = $1');
    expect(lastParams()).toEqual(["budi@binus.ac.id"]);
  });

  it("rejects a buyer with the wrong password", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [await buyerRow("rahasia1")] });

    const res = await login(
      post({ email: "budi@binus.ac.id", password: "salah123", role: "buyer" })
    );

    expect(res.status).toBe(401);
  });

  it("returns 404 when the email is not registered", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] });

    const res = await login(
      post({ email: "tidak@ada.com", password: "rahasia1", role: "kitchen" })
    );

    expect(res.status).toBe(404);
    expect(lastSql()).toContain('from "kitchens" where "kitchens"."kitchen_email" = $1');
  });

  it("passes SQL-looking input as a bound parameter", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] });
    const email = "x' OR '1'='1";

    await login(post({ email, password: "rahasia1", role: "buyer" }));

    expect(lastSql()).not.toContain(email);
    expect(lastParams()).toEqual([email]);
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
        [1, "dapur@binus.ac.id", "dapur123", "Dapur Bu Ani", "Ani", "081234567890", "Kantin A", "INACTIVE", null, false],
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
