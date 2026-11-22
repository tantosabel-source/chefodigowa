import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";

const SESSION_COOKIE = "odi_admin_session";
const SESSION_VALUE = "chef-dashboard-v1";

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "chefodi2026";
}

function sign(value: string): string {
  return createHmac("sha256", adminPassword()).update(value).digest("hex");
}

function expectedToken(): string {
  return sign(SESSION_VALUE);
}

export function isValidPassword(candidate: string): boolean {
  const expected = adminPassword();
  const a = Buffer.from(candidate.trim());
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function createAdminSession(): Promise<void> {
  const store = await cookies();
  const requestHeaders = await headers();
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (requestHeaders.get("host")?.includes("localhost") ? "http" : "https");

  store.set(SESSION_COOKIE, expectedToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: protocol === "https",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function destroyAdminSession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  const expected = expectedToken();
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
