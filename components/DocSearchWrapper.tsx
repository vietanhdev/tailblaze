'use client'

import { useState, useEffect } from 'react'
import { DocSearch as AlgoliaDocSearch } from '@docsearch/react'
import '@docsearch/css'

type DocSearchProps = {
  appId: string
  indexName: string
  apiKey: string
}

export default function DocSearch({ appId, indexName, apiKey }: DocSearchProps) {
  const [isMounted, setIsMounted] = useState(false)

  // Only render on client side to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Don't render during SSR
  if (!isMounted) return null

  return <AlgoliaDocSearch appId={appId} indexName={indexName} apiKey={apiKey} />
}
