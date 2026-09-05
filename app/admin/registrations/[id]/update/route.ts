import { eq } from "drizzle-orm";
import { getDb } from "../../../../../db";
import { registrations } from "../../../../../db/schema";
import { destinations } from "../../../../data";

function findSession(destinationSlug: string, sessionId: string) {
  const destination = destinations.find((item) => item.slug === destinationSlug);
  return destination?.sessions?.find((session) => session.id === sessionId) ?? null;
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const registrationId = Number(id);

  const redirectToEdit = (code: string) => {
    const url = new URL(`/admin/registrations/${id}`, request.url);
    url.searchParams.set("error", code);
    return Response.redirect(url, 303);
  };

  if (!Number.isInteger(registrationId)) return redirectToEdit("sesion_invalida");

  const formData = await request.formData();
  const get = (key: string) => String(formData.get(key) ?? "").trim();

  const [destinationSlug = "", sessionId = ""] = get("sessionKey").split("::");
  const childName = get("childName");
  const childAge = get("childAge");
  const parentName = get("parentName");
  const parentPhone = get("parentPhone");
  const parentEmail = get("parentEmail");
  const school = get("school");
  const emergencyContactName = get("emergencyContactName");
  const emergencyContactPhone = get("emergencyContactPhone");
  const medicalNotes = get("medicalNotes") || null;
  const comments = get("comments") || null;

  const requiredFields = {
    destinationSlug,
    sessionId,
    childName,
    childAge,
    parentName,
    parentPhone,
    parentEmail,
    school,
    emergencyContactName,
    emergencyContactPhone,
  };
  if (Object.values(requiredFields).some((value) => !value)) {
    return redirectToEdit("faltan_campos");
  }

  if (!findSession(destinationSlug, sessionId)) {
    return redirectToEdit("sesion_invalida");
  }

  const db = getDb();
  await db
    .update(registrations)
    .set({
      destinationSlug,
      sessionId,
      childName,
      childAge,
      parentName,
      parentPhone,
      parentEmail,
      school,
      emergencyContactName,
      emergencyContactPhone,
      medicalNotes,
      comments,
    })
    .where(eq(registrations.id, registrationId));

  return Response.redirect(new URL("/admin?updated=1", request.url), 303);
}
