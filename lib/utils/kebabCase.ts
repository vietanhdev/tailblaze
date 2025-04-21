import { slug } from 'github-slugger'

/**
 * Convert a string to kebab-case using github-slugger
 * @param str - String to convert
 * @returns kebab-cased string
 */
const kebabCase = (str: string): string => slug(str)

export default kebabCase
