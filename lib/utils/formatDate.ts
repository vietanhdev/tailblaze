import siteMetadata from '@/data/siteMetadata'
import { parseDateWithDefaultTimezone } from '@/lib/datetime'

/**
 * Format a date string into a localized format
 * @param date - Date string to format
 * @returns Formatted date string
 */
const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const now = parseDateWithDefaultTimezone(date).toLocaleDateString(siteMetadata.locale, options)

  return now
}

export default formatDate
