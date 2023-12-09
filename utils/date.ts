export function formatDate(dateTime: string): string {
    const date = new Date(dateTime);
    return date.toUTCString()
 }