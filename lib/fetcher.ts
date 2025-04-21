/**
 * A simple wrapper around fetch that returns JSON
 * @param args - Arguments to pass to fetch
 * @returns Parsed JSON response
 */
export default async function Fetcher(...args: Parameters<typeof fetch>): Promise<any> {
  const res = await fetch(...args)
  return res.json()
}
