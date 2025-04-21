import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import headerNavLinks from '@/data/headerNavLinks'
import { ChevronDown, ChevronRight, Sparkles } from 'lucide-react'
import dynamic from 'next/dynamic'
import React from 'react'

// Dynamically import the AIAppsLaunchpad component
const AIAppsLaunchpad = dynamic(() => import('./ai-apps/AIAppsLaunchpad'), {
  ssr: false,
  loading: () => null,
})

const MobileNav = (): React.ReactElement => {
  const router = useRouter()
  const [navShow, setNavShow] = useState<boolean>(false)
  const [expandedSection, setExpandedSection] = useState<number | null>(null)
  const [launchpadOpen, setLaunchpadOpen] = useState<boolean>(false)

  // Check if the current path matches the link href
  const isActive = (href: string): boolean => {
    if (href === '/') {
      return router.pathname === '/'
    }
    return router.pathname.startsWith(href)
  }

  // Check if any sublinks are active
  const isSubLinkActive = (links: Array<{ href: string; external?: boolean }>): boolean => {
    if (!links) return false
    return links.some((link) => !link.external && isActive(link.href))
  }

  const onToggleNav = (): void => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  const toggleSection = (index: number): void => {
    if (expandedSection === index) {
      setExpandedSection(null)
    } else {
      setExpandedSection(index)
    }
  }

  return (
    <div className="sm:hidden">
      <button
        type="button"
        className="ml-1 mr-1 h-8 w-8 rounded py-1"
        aria-label="Toggle Menu"
        onClick={onToggleNav}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-gray-900"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={`fixed left-0 top-0 z-10 h-full w-full transform bg-gray-200 opacity-95 duration-300 ease-in-out ${
          navShow ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end">
          <button
            type="button"
            className="mr-5 mt-11 h-8 w-8 rounded"
            aria-label="Toggle Menu"
            onClick={onToggleNav}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-gray-900"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <nav className="fixed mt-8 h-full">
          <div className="px-12 py-4">
            <button
              onClick={() => {
                setLaunchpadOpen(true)
                onToggleNav()
              }}
              className="flex items-center border-b border-gray-400 pb-1 text-2xl font-semibold tracking-widest text-primary hover:text-primary/80"
            >
              <Sparkles className="h-6 w-6 mr-1 inline-block text-primary" />
              <span>AI Apps</span>
            </button>
          </div>

          {headerNavLinks.map((link, index) => (
            <div key={index} className="px-12 py-4">
              {link.links ? (
                <div>
                  <button
                    className={`flex items-center border-b ${
                      isSubLinkActive(link.links as Array<{ href: string; external?: boolean }>)
                        ? 'text-primary font-bold border-primary border-b-2'
                        : 'border-gray-400 pb-1 text-gray-700'
                    } pb-1 text-2xl font-semibold tracking-widest hover:text-black`}
                    onClick={() => toggleSection(index)}
                    aria-label={link?.ariaLabel || link?.title}
                  >
                    {link.icon && (
                      <link.icon
                        className={`h-6 w-6 mr-1 inline-block ${
                          isSubLinkActive(link.links as Array<{ href: string; external?: boolean }>)
                            ? 'text-primary'
                            : ''
                        }`}
                      />
                    )}
                    <span>{link?.title}</span>
                    {expandedSection === index ? (
                      <ChevronDown className="ml-2 h-5 w-5" />
                    ) : (
                      <ChevronRight className="ml-2 h-5 w-5" />
                    )}
                  </button>

                  {expandedSection === index && (
                    <div className="mt-2 ml-6 space-y-2">
                      {link.links.map((subLink, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subLink.href || ''}
                          passHref
                          target={subLink.external ? '_blank' : '_self'}
                          className={`flex items-center py-2 text-xl ${
                            isActive(subLink.href || '') && !subLink.external
                              ? 'font-bold text-primary border-l-2 border-primary pl-2'
                              : 'text-gray-700 hover:text-black'
                          }`}
                          onClick={onToggleNav}
                          aria-label={subLink?.ariaLabel || subLink?.title}
                        >
                          {subLink.icon && (
                            <subLink.icon
                              className={`h-5 w-5 mr-2 inline-block ${
                                isActive(subLink.href || '') && !subLink.external
                                  ? 'text-primary'
                                  : ''
                              }`}
                            />
                          )}
                          <span>{subLink.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={link.href || ''}
                  passHref
                  className={`flex items-center border-b ${
                    isActive(link.href || '')
                      ? 'text-primary font-bold border-primary border-b-2'
                      : link.highlight
                        ? 'text-primary border-gray-400 pb-1'
                        : 'text-gray-700 border-gray-400 pb-1'
                  } text-2xl font-semibold tracking-widest hover:text-black`}
                  onClick={onToggleNav}
                  aria-label={link?.ariaLabel || link?.title}
                >
                  {link.icon && (
                    <link.icon
                      className={`h-6 w-6 mr-1 inline-block ${
                        isActive(link.href || '') || link?.highlight ? 'text-primary' : ''
                      }`}
                    />
                  )}
                  <span>{link?.title}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* AI Apps Launchpad */}
      <AIAppsLaunchpad isOpen={launchpadOpen} onClose={() => setLaunchpadOpen(false)} />
    </div>
  )
}

export default MobileNav
