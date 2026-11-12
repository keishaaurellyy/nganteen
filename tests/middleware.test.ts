import { describe, expect, it } from "@jest/globals";
import type { jest as Jest } from "@jest/globals";
import { NextRequest } from "next/server";
import type { JWT } from "next-auth/jwt";
import { middleware } from "@/middleware";

// The global jest, not the @jest/globals import: next/jest only hoists jest.mock for the global.
declare const jest: typeof Jest;

const mockGetToken = jest.fn<() => Promise<JWT | null>>();

jest.mock("next-auth/jwt", () => ({ getToken: () => mockGetToken() }));

const visit = (path: string, role?: string) => {
  mockGetToken.mockResolvedValueOnce(role ? ({ role } as JWT) : null);
  return middleware(new NextRequest(`http://localhost${path}`));
};

const isRedirectToUnauthorized = (res: Response) =>
  res.headers.get("location") === "http://localhost/unauthorized";

describe("middleware", () => {
  it("redirects visitors without a session", async () => {
    expect(isRedirectToUnauthorized(await visit("/admin"))).toBe(true);
  });

  it.each([
    ["admin", "/admin/create-kitchen"],
    ["buyer", "/buyers/order-history"],
    ["kitchen", "/kitchens/orders"],
  ])("lets a %s through to %s", async (role, path) => {
    const res = await visit(path, role);
    expect(res.headers.get("x-middleware-next")).toBe("1");
  });

  it.each([
    ["buyer", "/admin"],
    ["kitchen", "/buyers"],
    ["admin", "/kitchens/menu"],
  ])("redirects a %s away from %s", async (role, path) => {
    expect(isRedirectToUnauthorized(await visit(path, role))).toBe(true);
  });
});
