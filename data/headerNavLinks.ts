'use client'
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si'
import { Users, Mail } from 'lucide-react'
import { NavLink } from '@/types/navLink'

const headerNavLinks: NavLink[] = [
  { href: '/', title: 'Home', ariaLabel: 'Home' },
  { href: '/blog', title: 'Blog', ariaLabel: 'Blog' },
  { href: '/notes', title: 'Notes', ariaLabel: 'Notes' },
  { href: '/projects', title: 'Projects', ariaLabel: 'Projects' },
  { href: '/about', title: 'About', ariaLabel: 'About' },
  { href: '/tags', title: 'Tags', ariaLabel: 'Tags' },
  { href: '/contact', icon: Mail, ariaLabel: 'Contact Me' },
  {
    href: 'https://github.com/vietanhdev/tailblaze',
    title: 'Github',
    icon: SiGithub,
    external: true,
    ariaLabel: 'GitHub Repository',
  },
]

export default headerNavLinks
