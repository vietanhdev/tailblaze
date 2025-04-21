export interface Analytics {
  googleAnalyticsId: string
}

export interface Newsletter {
  provider: string | undefined
}

export interface Comment {
  provider: 'disqus' | 'utterances'
  disqusConfig: {
    shortname: string
  }
  utterancesConfig: {
    repo: string
    issueTerm: string
    label: string
    theme: string
    darkTheme: string
  }
}

export interface SocialAccount {
  twitter: string
}

export interface Credit {
  author: string
  website: string
  github: string
}

export interface SiteMetadata {
  title: string
  author: string
  headerTitle: string
  description: string
  notes: string
  language: string
  theme: 'system' | 'dark' | 'light'
  siteUrl: string
  siteRepo: string
  siteLogo: string
  image: string
  socialBanner: string
  email: string
  github: string
  twitter: string
  linkedin: string
  website: string
  locale: string
  keywords: string
  analytics: Analytics
  newsletter: Newsletter
  comment: Comment
  socialAccount: SocialAccount
  credit: Credit
}
