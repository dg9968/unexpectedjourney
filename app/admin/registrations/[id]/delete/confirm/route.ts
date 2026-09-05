import { eq } from "drizzle-orm";
import { getDb } from "../../../../../../db";
import { registrations } from "../../../../../../db/schema";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const registrationId = Number(id);

  if (Number.isInteger(registrationId)) {
    const db = getDb();
    await db.delete(registrations).where(eq(registrations.id, registrationId));
  }

  return Response.redirect(new URL("/admin?deleted=1", request.url), 303);
}
