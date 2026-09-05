import { desc } from "drizzle-orm";
import { getDb } from "../../db";
import { registrations } from "../../db/schema";
import { destinations } from "../data";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ updated?: string; deleted?: string }>;
}) {
  const { updated, deleted } = await searchParams;
  const db = getDb();
  const rows = await db.select().from(registrations).orderBy(desc(registrations.createdAt));

  const countsBySession = new Map<string, number>();
  for (const row of rows) {
    countsBySession.set(row.sessionId, (countsBySession.get(row.sessionId) ?? 0) + 1);
  }

  const sessionSummaries = destinations.flatMap((destination) =>
    (destination.sessions ?? []).map((session) => ({
      destinationName: destination.name,
      session,
      registered: countsBySession.get(session.id) ?? 0,
    })),
  );

  return (
    <main className="admin-page">
      <h1>Registros</h1>

      {updated && <p className="form-success">Registro actualizado.</p>}
      {deleted && <p className="form-success">Registro eliminado.</p>}

      <section className="admin-summary">
        {sessionSummaries.map(({ destinationName, session, registered }) => (
          <div key={session.id} className="admin-summary-card">
            <strong>
              {destinationName} · {session.label}
            </strong>
            <span>
              {registered}/{session.capacity} inscritos
            </span>
          </div>
        ))}
      </section>

      <a className="button button-small" href="/admin/export">
        Exportar CSV
      </a>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Niño(a)</th>
              <th>Edad</th>
              <th>Escuela</th>
              <th>Padre/tutor</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Contacto emergencia</th>
              <th>Tel. emergencia</th>
              <th>Notas médicas</th>
              <th>Comentarios</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.createdAt}</td>
                <td>{row.childName}</td>
                <td>{row.childAge}</td>
                <td>{row.school}</td>
                <td>{row.parentName}</td>
                <td>{row.parentPhone}</td>
                <td>{row.parentEmail}</td>
                <td>{row.emergencyContactName}</td>
                <td>{row.emergencyContactPhone}</td>
                <td>{row.medicalNotes}</td>
                <td>{row.comments}</td>
                <td>
                  <div className="admin-table-actions">
                    <a href={`/admin/registrations/${row.id}`}>Editar</a>
                    <a href={`/admin/registrations/${row.id}/delete`}>Eliminar</a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
