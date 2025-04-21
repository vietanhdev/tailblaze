const { replace } = ''

// escape
const ca = /[&<>'"]/g

const esca: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
}

const pe = (m: string): string => esca[m]

/**
 * Safely escape HTML entities such as `&`, `<`, `>`, `"`, and `'`.
 * @param es - the input to safely escape
 * @returns the escaped input, and it **throws** an error if
 *  the input type is unexpected, except for boolean and numbers,
 *  converted as string.
 */
export const escape = (es: string | number | boolean): string => replace.call(String(es), ca, pe)
