/**
 * Parse a date string using a specified timezone
 * @param dateStr - The date string to parse
 * @param timeZone - The timezone to use (defaults to 'Asia/Ho_Chi_Minh')
 * @returns A Date object in the specified timezone
 */
export function parseDateWithDefaultTimezone(
  dateStr: string,
  timeZone: string = 'Asia/Ho_Chi_Minh'
): Date {
  // Convert the input date string to a Date object
  const date = new Date(dateStr)

  // Format the date in the target timezone to get consistent representation
  const targetDateStr = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: timeZone,
  }).format(date)

  // Parse the formatted date back to a Date object
  const [month, day, year, time] = targetDateStr.replace(',', '').replace(/\//g, ' ').split(' ')

  const [hour, minute, second] = time.split(':')

  return new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hour),
    parseInt(minute),
    parseInt(second)
  )
}
