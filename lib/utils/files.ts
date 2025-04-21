import fs from 'fs'
import path from 'path'

/**
 * Function composition utility
 * @param fns - Functions to compose
 * @returns Composed function
 */
const pipe =
  <T>(...fns: Array<(arg: any) => any>) =>
  (x: T): any =>
    fns.reduce((v, f) => f(v), x)

/**
 * Flatten a nested array
 * @param input - Array to flatten
 * @returns Flattened array
 */
const flattenArray = <T>(input: Array<T | T[]>): T[] =>
  input.reduce<T[]>((acc, item) => [...acc, ...(Array.isArray(item) ? item : [item])], [])

/**
 * Map function over an array
 * @param fn - Function to apply
 * @returns Mapped array
 */
const map =
  <T, U>(fn: (item: T) => U) =>
  (input: T[]): U[] =>
    input.map(fn)

/**
 * Walk a directory, returning file paths
 * @param fullPath - Path to walk
 * @returns File paths
 */
const walkDir = (fullPath: string): string | string[] => {
  return fs.statSync(fullPath).isFile() ? fullPath : getAllFilesRecursively(fullPath)
}

/**
 * Join a prefix to a path
 * @param prefix - Prefix to join
 * @returns Function that joins paths
 */
const pathJoinPrefix =
  (prefix: string) =>
  (extraPath: string): string =>
    path.join(prefix, extraPath)

/**
 * Get all files in a directory and its subdirectories
 * @param folder - Folder to search
 * @returns Array of file paths
 */
const getAllFilesRecursively = (folder: string): string[] => {
  if (!fs.existsSync(folder)) {
    return []
  }
  return pipe(fs.readdirSync, map(pipe(pathJoinPrefix(folder), walkDir)), flattenArray)(folder)
}

export default getAllFilesRecursively
