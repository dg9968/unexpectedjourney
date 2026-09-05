import { ADMIN_COOKIE_NAME, hashSecret } from "../../../admin-auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = String(formData.get("password") ?? "");

  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret || password !== adminSecret) {
    return new Response(null, {
      status: 303,
      headers: { Location: new URL("/admin/login?error=1", request.url).toString() },
    });
  }

  const token = await hashSecret(adminSecret);
  return new Response(null, {
    status: 303,
    headers: {
      Location: new URL("/admin", request.url).toString(),
      "Set-Cookie": `${ADMIN_COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`,
    },
  });
}
