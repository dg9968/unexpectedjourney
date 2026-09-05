import { count, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { registrations } from "../../../db/schema";
import { destinations } from "../../data";

function toRouteErrorMessage(error: unknown) {
  const code =
    error && typeof error === "object" && "code" in error
      ? (error as { code?: string }).code
      : undefined;
  const message = error instanceof Error ? error.message : "Unexpected error";
  const detail =
    error instanceof Error && error.cause instanceof Error ? error.cause.message : "";
  const combined = `${message}\n${detail}`;

  if (code === "42P01" || combined.includes('relation "registrations" does not exist')) {
    return "no_table";
  }

  return "error";
}

function findSession(destinationSlug: string, sessionId: string) {
  const destination = destinations.find((item) => item.slug === destinationSlug);
  return destination?.sessions?.find((session) => session.id === sessionId) ?? null;
}

function redirectWithError(request: Request, code: string) {
  const url = new URL("/registro", request.url);
  url.searchParams.set("error", code);
  return Response.redirect(url, 303);
}

export async function POST(request: Request) {
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
    return redirectWithError(request, "faltan_campos");
  }

  const session = findSession(destinationSlug, sessionId);
  if (!session) {
    return redirectWithError(request, "sesion_invalida");
  }

  try {
    const db = getDb();
    const [{ value: currentCount }] = await db
      .select({ value: count() })
      .from(registrations)
      .where(eq(registrations.sessionId, sessionId));

    if (currentCount >= session.capacity) {
      return redirectWithError(request, "cupo_lleno");
    }

    await db.insert(registrations).values({
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
    });
  } catch (error) {
    return redirectWithError(request, toRouteErrorMessage(error));
  }

  return Response.redirect(new URL("/registro?success=1", request.url), 303);
}
