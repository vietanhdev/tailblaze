import { StaticImageData } from 'next/image'

export interface Project {
  title: string
  description: string
  imgSrc: string | StaticImageData
  href: string
  website?: string | null
  github?: string | null
  demo?: string | null
  techstack?: string[]
  tags?: string[]
}
