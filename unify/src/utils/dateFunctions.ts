
export function dateToDaysRemaining(s: string): string {
    const millisecondsInDay = 24 * 60 * 60 * 1000
    const millisecondsRemaining = Date.parse(s) - Date.now()

    const daysRemaining = Math.floor(millisecondsRemaining / millisecondsInDay)

    return `${Math.min(0, daysRemaining)} days remaining`

}