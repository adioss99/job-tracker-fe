type DateType = "numeric" | "2-digit";
type MonthType = "numeric" | "2-digit" | "long" | "short" | "narrow";

export function dateFormat(
  isoString: Date,
  locale: string = "id-ID",
  year: DateType = "2-digit",
  month: MonthType = "numeric",
  day: DateType = "2-digit"
) {
  const date = new Date(isoString);
  return {
    utc: date.toISOString(), // versi UTC
    local: date.toLocaleString(locale, {
      timeZone: "Asia/Jakarta", // WIB
      year,
      month,
      day,
    }),
  };
}

export function detailDateFormatter(isoString: Date) {
  return dateFormat(isoString, "id-ID", "numeric", "long", "2-digit");
}
export function maxTextLength(text: string, length: number = 12) {
  return text.length > length ? text.slice(0, length) + "..." : text;
}
