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
    title: 'Social',
    icon: Users,
    ariaLabel: 'Social Media Links',
    links: [
      {
        href: 'https://twitter.com/yourusername',
        title: 'Twitter',
        icon: SiX,
        external: true,
        ariaLabel: 'Twitter Profile',
      },
      {
        href: 'https://linkedin.com/in/yourusername',
        title: 'LinkedIn',
        icon: SiLinkedin,
        external: true,
        ariaLabel: 'LinkedIn Profile',
      },
      {
        href: 'https://github.com/yourusername',
        title: 'GitHub',
        icon: SiGithub,
        external: true,
        ariaLabel: 'GitHub Profile',
      },
    ],
  },
]

export default headerNavLinks
