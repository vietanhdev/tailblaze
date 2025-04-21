import { ReactNode } from 'react'

// Common props for UI components
export interface WithChildrenProps {
  children: ReactNode
}

// Props for Card component
export interface CardProps extends WithChildrenProps {
  className?: string
}

// Props for Button component
export interface ButtonProps {
  children: ReactNode
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  [key: string]: any
}

// Props for Dialog component
export interface DialogProps extends WithChildrenProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

// Props for Tag component
export interface TagProps {
  text: string
  className?: string
}

// Props for SEO components
export interface SEOProps {
  title: string
  description: string
  ogType?: string
  ogImage?: string
  twImage?: string
  canonicalUrl?: string
}
