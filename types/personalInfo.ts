export interface Position {
  title: string
  period: string
  description?: string
}

export interface CareerEntry {
  period: string
  company: string
  description: string
  positions?: Position[]
  achievements?: string[]
}

export interface Milestone {
  year: number
  description: string
  project?: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface SocialLinks {
  linkedin: string
}

export interface PersonalInfo {
  name: string
  title: string
  description: string
  skills: string[]
  currentRole: string
  socialLinks: SocialLinks
  contact: string
}
