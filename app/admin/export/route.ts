import { desc } from "drizzle-orm";
import { getDb } from "../../../db";
import { registrations } from "../../../db/schema";

type Registration = typeof registrations.$inferSelect;

const CSV_COLUMNS: (keyof Registration)[] = [
  "createdAt",
  "destinationSlug",
  "sessionId",
  "childName",
  "childAge",
  "school",
  "parentName",
  "parentPhone",
  "parentEmail",
  "emergencyContactName",
  "emergencyContactPhone",
  "medicalNotes",
  "comments",
];

function toCsv(rows: Registration[]) {
  const escape = (value: string | null) => `"${(value ?? "").replace(/"/g, '""')}"`;
  const lines = [CSV_COLUMNS.join(",")];
  for (const row of rows) {
    lines.push(CSV_COLUMNS.map((column) => escape(row[column] as string | null)).join(","));
  }
  return lines.join("\n");
}

export async function GET() {
  const db = getDb();
  const rows = await db.select().from(registrations).orderBy(desc(registrations.createdAt));

  return new Response(toCsv(rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="registros.csv"',
    },
  });
}
