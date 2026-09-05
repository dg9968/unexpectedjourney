import { count, eq } from "drizzle-orm";
import { getDb } from "../../db";
import { registrations } from "../../db/schema";
import { ContactBand, Footer, Header } from "../components";
import { destinations } from "../data";

export const dynamic = "force-dynamic";

const ERROR_MESSAGES: Record<string, string> = {
  faltan_campos: "Faltan campos obligatorios. Por favor completa el formulario de nuevo.",
  sesion_invalida: "Selecciona un destino y fecha válidos.",
  cupo_lleno: "Este grupo ya alcanzó su cupo máximo. Contáctanos por WhatsApp para lista de espera.",
  no_table: "El registro aún no está listo (falta desplegar la base de datos). Contáctanos por WhatsApp mientras tanto.",
  error: "Ocurrió un error al guardar tu registro. Intenta de nuevo o contáctanos por WhatsApp.",
};

export default async function RegistroPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string; destino?: string }>;
}) {
  const { success, error, destino } = await searchParams;

  const destinationsWithSessions = destinations.filter(
    (destination) => (destination.sessions?.length ?? 0) > 0,
  );

  const preselected = destinationsWithSessions.find((destination) => destination.slug === destino);
  const defaultSessionKey = preselected?.sessions?.[0]
    ? `${preselected.slug}::${preselected.sessions[0].id}`
    : "";

  const remainingBySession = new Map<string, number>();
  if (destinationsWithSessions.length > 0) {
    try {
      const db = getDb();
      for (const destination of destinationsWithSessions) {
        for (const session of destination.sessions ?? []) {
          const [{ value }] = await db
            .select({ value: count() })
            .from(registrations)
            .where(eq(registrations.sessionId, session.id));
          remainingBySession.set(session.id, Math.max(session.capacity - value, 0));
        }
      }
    } catch {
      // Database not provisioned yet (e.g. before first deploy) — fall back to full capacity.
    }
  }

  return (
    <main>
      <Header />
      <section className="section registro-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Inscripción</span>
            <h2>Regístrate para un campamento</h2>
          </div>
          <p>Completa los datos del estudiante y del padre o tutor. Te contactaremos por WhatsApp o correo para confirmar tu lugar.</p>
        </div>

        {success && <p className="form-success">¡Listo! Recibimos tu registro, te contactaremos pronto.</p>}
        {error && <p className="form-error">{ERROR_MESSAGES[error] ?? ERROR_MESSAGES.error}</p>}

        <form method="POST" action="/api/registrations" className="registro-form">
          <div className="field field-full">
            <label className="label" htmlFor="sessionKey">Destino y fecha</label>
            <select className="input" id="sessionKey" name="sessionKey" defaultValue={defaultSessionKey} required>
              <option value="" disabled>Selecciona un destino</option>
              {destinationsWithSessions.map((destination) =>
                (destination.sessions ?? []).map((session) => {
                  const remaining = remainingBySession.get(session.id) ?? session.capacity;
                  const price = session.priceAmount.toLocaleString("es-MX");
                  return (
                    <option
                      key={session.id}
                      value={`${destination.slug}::${session.id}`}
                      disabled={remaining <= 0}
                    >
                      {destination.name} · {session.label} · ${price} {session.currency}
                      {session.priceNote ? ` (${session.priceNote})` : ""} ·{" "}
                      {remaining > 0 ? `${remaining} lugares disponibles` : "Cupo lleno"}
                    </option>
                  );
                }),
              )}
            </select>
          </div>

          <div className="field">
            <label className="label" htmlFor="childName">Nombre del niño(a)</label>
            <input className="input" id="childName" name="childName" required />
          </div>
          <div className="field">
            <label className="label" htmlFor="childAge">Edad</label>
            <input className="input" id="childAge" name="childAge" type="number" min={5} max={18} required />
          </div>

          <div className="field field-full">
            <label className="label" htmlFor="school">Escuela de procedencia</label>
            <input className="input" id="school" name="school" required />
          </div>

          <div className="field">
            <label className="label" htmlFor="parentName">Nombre del padre, madre o tutor</label>
            <input className="input" id="parentName" name="parentName" required />
          </div>
          <div className="field">
            <label className="label" htmlFor="parentPhone">Teléfono</label>
            <input className="input" id="parentPhone" name="parentPhone" type="tel" required />
          </div>
          <div className="field field-full">
            <label className="label" htmlFor="parentEmail">Correo</label>
            <input className="input" id="parentEmail" name="parentEmail" type="email" required />
          </div>

          <div className="field">
            <label className="label" htmlFor="emergencyContactName">Contacto de emergencia</label>
            <input className="input" id="emergencyContactName" name="emergencyContactName" required />
          </div>
          <div className="field">
            <label className="label" htmlFor="emergencyContactPhone">Teléfono de emergencia</label>
            <input className="input" id="emergencyContactPhone" name="emergencyContactPhone" type="tel" required />
          </div>

          <div className="field field-full">
            <label className="label" htmlFor="medicalNotes">Alergias o notas médicas (opcional)</label>
            <textarea className="input" id="medicalNotes" name="medicalNotes" rows={3} />
          </div>
          <div className="field field-full">
            <label className="label" htmlFor="comments">Comentarios (opcional)</label>
            <textarea className="input" id="comments" name="comments" rows={3} />
          </div>

          <button className="button" type="submit">Enviar registro</button>
        </form>
      </section>
      <ContactBand />
      <Footer />
    </main>
  );
}
