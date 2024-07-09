export function formatNumber(number: number | undefined) {
    if (!number) return 0
    return number.toLocaleString('th', { maximumFractionDigits: 0 })
}