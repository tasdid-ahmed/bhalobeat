export function formatEventDate(value: string): string {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

// "2026-12-20T00:00:00.000Z" -> "2026-12-20" (for date inputs)
export function toDateInputValue(value: string): string {
  return value.slice(0, 10);
}