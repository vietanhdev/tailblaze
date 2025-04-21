import { SiteMetadata } from '@/types/siteMetadata'

const siteMetadata: SiteMetadata = {
  title: 'Tailblaze',
  author: 'Your Name',
  headerTitle: 'Tailblaze',
  description:
    'A modern, feature-rich blog theme built with Next.js and Tailwind CSS. Original theme by Viet-Anh Nguyen.',
  notes: 'Short notes and quick references',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://tailblaze.vietanh.dev',
  siteRepo: 'https://github.com/yourusername/tailblaze',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/avatar.png',
  socialBanner: '/static/images/banner.png',
  email: 'hello@example.com',
  github: 'https://github.com/yourusername',
  twitter: 'https://twitter.com/yourusername',
  linkedin: 'https://www.linkedin.com/in/yourusername/',
  website: 'https://example.com',
  locale: 'en-US',
  keywords:
    'blog, nextjs, tailwindcss, theme, template, markdown, mdx, static site, viet-anh nguyen',
  analytics: {
    googleAnalyticsId: '', // e.g. UA-000000-2 or G-XXXXXXX
  },
  newsletter: {
    provider: process.env.MAILCHIMP_URL,
  },
  comment: {
    provider: 'disqus',
    disqusConfig: {
      shortname: 'tailblaze',
    },
    utterancesConfig: {
      repo: 'yourusername/tailblaze',
      issueTerm: 'pathname',
      label: 'Comment',
      theme: 'github-light',
      darkTheme: 'github-dark',
    },
  },
  socialAccount: {
    twitter: 'yourusername',
  },
  credit: {
    author: 'Viet-Anh Nguyen',
    website: 'https://www.vietanh.dev',
    github: 'https://github.com/vietanhdev',
  },
}

export default siteMetadata
