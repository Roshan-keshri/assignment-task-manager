// Date-only values ("2025-03-01") are parsed as local dates so they don't shift a day in some timezones.
export function formatDate(value) {
  if (!value) return "Not set";
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  const date = m ? new Date(+m[1], +m[2] - 1, +m[3]) : new Date(value);
  if (isNaN(date)) return "Not set";
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export function formatDateTime(value) {
  const date = new Date(value);
  if (isNaN(date)) return "—";
  return date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}
