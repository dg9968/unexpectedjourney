import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { getDb } from "../../../../db";
import { registrations } from "../../../../db/schema";
import { destinations } from "../../../data";

export const dynamic = "force-dynamic";

const ERROR_MESSAGES: Record<string, string> = {
  faltan_campos: "Faltan campos obligatorios.",
  sesion_invalida: "Selecciona un destino y fecha válidos.",
};

export default async function EditRegistrationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const registrationId = Number(id);
  if (!Number.isInteger(registrationId)) notFound();

  const db = getDb();
  const [row] = await db.select().from(registrations).where(eq(registrations.id, registrationId));
  if (!row) notFound();

  const sessionKey = `${row.destinationSlug}::${row.sessionId}`;

  return (
    <main className="admin-page">
      <h1>Editar registro</h1>
      {error && <p className="form-error">{ERROR_MESSAGES[error] ?? "No se pudo guardar el registro."}</p>}

      <form method="POST" action={`/admin/registrations/${row.id}/update`} className="registro-form">
        <div className="field field-full">
          <label className="label" htmlFor="sessionKey">Destino y fecha</label>
          <select className="input" id="sessionKey" name="sessionKey" defaultValue={sessionKey} required>
            {destinations.flatMap((destination) =>
              (destination.sessions ?? []).map((session) => (
                <option key={session.id} value={`${destination.slug}::${session.id}`}>
                  {destination.name} · {session.label}
                </option>
              )),
            )}
          </select>
        </div>

        <div className="field">
          <label className="label" htmlFor="childName">Nombre del niño(a)</label>
          <input className="input" id="childName" name="childName" defaultValue={row.childName} required />
        </div>
        <div className="field">
          <label className="label" htmlFor="childAge">Edad</label>
          <input className="input" id="childAge" name="childAge" type="number" min={5} max={18} defaultValue={row.childAge} required />
        </div>

        <div className="field field-full">
          <label className="label" htmlFor="school">Escuela de procedencia</label>
          <input className="input" id="school" name="school" defaultValue={row.school} required />
        </div>

        <div className="field">
          <label className="label" htmlFor="parentName">Nombre del padre, madre o tutor</label>
          <input className="input" id="parentName" name="parentName" defaultValue={row.parentName} required />
        </div>
        <div className="field">
          <label className="label" htmlFor="parentPhone">Teléfono</label>
          <input className="input" id="parentPhone" name="parentPhone" type="tel" defaultValue={row.parentPhone} required />
        </div>
        <div className="field field-full">
          <label className="label" htmlFor="parentEmail">Correo</label>
          <input className="input" id="parentEmail" name="parentEmail" type="email" defaultValue={row.parentEmail} required />
        </div>

        <div className="field">
          <label className="label" htmlFor="emergencyContactName">Contacto de emergencia</label>
          <input className="input" id="emergencyContactName" name="emergencyContactName" defaultValue={row.emergencyContactName} required />
        </div>
        <div className="field">
          <label className="label" htmlFor="emergencyContactPhone">Teléfono de emergencia</label>
          <input className="input" id="emergencyContactPhone" name="emergencyContactPhone" type="tel" defaultValue={row.emergencyContactPhone} required />
        </div>

        <div className="field field-full">
          <label className="label" htmlFor="medicalNotes">Alergias o notas médicas (opcional)</label>
          <textarea className="input" id="medicalNotes" name="medicalNotes" rows={3} defaultValue={row.medicalNotes ?? ""} />
        </div>
        <div className="field field-full">
          <label className="label" htmlFor="comments">Comentarios (opcional)</label>
          <textarea className="input" id="comments" name="comments" rows={3} defaultValue={row.comments ?? ""} />
        </div>

        <div className="admin-row-actions">
          <button className="button" type="submit">Guardar cambios</button>
          <a className="button button-light" href="/admin">Cancelar</a>
        </div>
      </form>
    </main>
  );
}
