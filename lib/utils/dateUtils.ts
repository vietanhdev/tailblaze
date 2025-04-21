/**
 * Get the current day name (e.g., "Monday", "Tuesday")
 * @returns The current day name
 */
export const currentDayName = (): string => {
  const date = new Date()
  return date.toLocaleString('default', { weekday: 'long' })
}
