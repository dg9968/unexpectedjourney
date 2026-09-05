import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { getDb } from "../../../../../db";
import { registrations } from "../../../../../db/schema";

export const dynamic = "force-dynamic";

export default async function DeleteRegistrationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const registrationId = Number(id);
  if (!Number.isInteger(registrationId)) notFound();

  const db = getDb();
  const [row] = await db.select().from(registrations).where(eq(registrations.id, registrationId));
  if (!row) notFound();

  return (
    <main className="admin-delete-confirm">
      <h1>¿Eliminar este registro?</h1>
      <p>
        Vas a eliminar el registro de <strong>{row.childName}</strong> ({row.school}). Esta acción no se puede deshacer.
      </p>
      <div className="admin-delete-actions">
        <form method="POST" action={`/admin/registrations/${row.id}/delete/confirm`}>
          <button className="button button-danger" type="submit">Sí, eliminar</button>
        </form>
        <a className="button button-light" href="/admin">Cancelar</a>
      </div>
    </main>
  );
}
