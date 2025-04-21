import Link from 'next/link'
import { ReactNode } from 'react'

interface ContactLinkProps {
  title: string
  href: string
  icon: ReactNode
}

const ContactLink = ({ title, href, icon }: ContactLinkProps) => {
  return (
    <Link passHref href={href} target="_blank" rel="noopener noreferrer" aria-label={title}>
      <li className="duration-250 mr-2 inline cursor-pointer text-4xl transition-colors ease-in hover:text-gray-400 sm:text-6xl md:text-5xl lg:text-6xl">
        <span className="duration-250 transition-colors ease-in hover:text-primary-600">
          {icon}
        </span>
        <span className="font-light opacity-50">@</span>
        <div className="duration-250 font-mono  transition-colors ease-in hover:text-gray-500 ">
          {title}
        </div>
      </li>
    </Link>
  )
}

export default ContactLink
