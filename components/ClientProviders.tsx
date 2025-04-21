'use client'

import { ThemeProvider } from 'next-themes'
import React from 'react'

interface ClientProvidersProps {
  children: React.ReactNode
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {/* Progress bar removed due to React 19 compatibility issues */}
      {children}
    </ThemeProvider>
  )
}
