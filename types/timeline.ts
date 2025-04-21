export interface TimelineItem {
  year: string
  position: 'left' | 'right'
  title?: string
  company?: string
  content: string | React.ReactNode
  image?: any
  imageAlt?: string
}
