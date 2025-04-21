// Raw data structure from JSON
export interface GlossaryTerm {
  id?: string | number
  url: string
  name: string
  full_name: string | null
  description?: string
  paper?: { title: string; url: string } | null
  introduced_year?: number
  source_url?: string | null
  source_title?: string | null
  code_snippet_url?: string | null
  num_papers?: number
  collections: { collection: string }[]
  [key: string]: any
}

// Collection type used in Term
export interface Collection {
  collection: string
  [key: string]: any
}

// Processed term for UI components
export interface Term {
  name: string | null
  full_name: string | null
  description: string | null
  collections: Collection[] | null
  source_url?: string | null
  source_title?: string | null
  introduced_year?: string | null
  url?: string
  [key: string]: any
}

// Convert GlossaryTerm to Term
export function convertToTerm(term: GlossaryTerm | null): Term | undefined {
  if (!term) return undefined

  return {
    ...term,
    full_name: term.full_name || term.name,
    description: term.description || '',
    source_url: term.source_url || null,
    source_title: term.source_title || null,
    introduced_year: term.introduced_year?.toString() || null, // Convert number to string or null
    collections: term.collections || [],
  }
}
