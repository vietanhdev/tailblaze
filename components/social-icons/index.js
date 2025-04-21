import {
  AiOutlineGithub,
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineGlobal,
} from 'react-icons/ai'
import { FaLinkedinIn } from 'react-icons/fa'
import { FiExternalLink, FiMail } from 'react-icons/fi'
import Link from 'next/link'

const components = {
  mail: FiMail,
  github: AiOutlineGithub,
  facebook: AiOutlineFacebook,
  linkedin: FaLinkedinIn,
  twitter: AiOutlineTwitter,
  website: AiOutlineGlobal,
  external: FiExternalLink,
}

const SocialIcon = ({ kind, href, size = 8 }) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const SocialSvg = components[kind]

  return (
    <Link
      passHref
      className="text-sm text-gray-500 transition duration-200 hover:rotate-180 hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg className={`text-gray-700 hover:text-primary-color-500 h-${size} w-${size}`} />
    </Link>
  )
}

export default SocialIcon
