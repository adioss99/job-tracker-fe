// utils/date.ts
export function dateFormat(isoString: Date, locale: string = "id-ID") {
  const date = new Date(isoString);

  return {
    utc: date.toISOString(), // versi UTC
    local: date.toLocaleString(locale, {
      timeZone: "Asia/Jakarta", // WIB
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  };
}
