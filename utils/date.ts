export function formatDate(dateTime: Date): string {
    return dateTime.toUTCString()
 }

// Renders a backend timestamp as an Asia/Bangkok locale string (th-TH).
// The backend stores naive timestamps that are UTC server time, so strings
// without an explicit timezone are treated as UTC before converting.
export function formatBangkokDateTime(value?: string | null): string {
    if (!value) return "-"
    const hasTimezone = /(?:Z|[+-]\d{2}:?\d{2})$/.test(value)
    const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value)
    let iso = value
    if (isDateOnly) {
        iso = `${value}T00:00:00Z`
    } else if (!hasTimezone) {
        iso = `${value}Z`
    }
    const date = new Date(iso)
    if (isNaN(date.getTime())) return value
    return date.toLocaleString("th-TH", {
        timeZone: "Asia/Bangkok",
        dateStyle: "short",
        timeStyle: "short",
    })
}