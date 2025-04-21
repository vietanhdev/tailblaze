'use client'

import { useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/router'
import headerNavLinks from '@/data/headerNavLinks'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import DocSearch from './DocSearchWrapper'
import DropMenu from './DropMenu'
import Link from 'next/link'
import logo from '../public/logo.png'
import Image from 'next-image-export-optimizer'
import { ChevronDown, Sparkles } from 'lucide-react'
import dynamic from 'next/dynamic'
import React from 'react'

// Define interfaces for the header nav links
interface SubLink {
  href: string
  title?: string
  icon?: React.ComponentType<any>
  external?: boolean
  ariaLabel: string
}

interface NavLink {
  href?: string
  title?: string
  icon?: React.ComponentType<any>
  ariaLabel: string
  links?: SubLink[]
  external?: boolean
  highlight?: boolean
}

// Dynamically import the AIAppsLaunchpad component to avoid loading it on every page
const AIAppsLaunchpad = dynamic(() => import('./ai-apps/AIAppsLaunchpad'), {
  loading: () => null,
  ssr: false,
})

// Dynamically import the ChatSupport component
const ChatSupportComponent = dynamic(
  () => import('@/components/ui/chat-support').then((mod) => mod.default),
  {
    loading: () => null,
    ssr: false,
  }
)

interface LayoutWrapperProps {
  children: ReactNode
}

const LayoutWrapper = ({ children }: LayoutWrapperProps): React.ReactElement => {
  const router = useRouter()
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const [launchpadOpen, setLaunchpadOpen] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(false)

  // Check if the current path matches the link href
  const isActive = (href: string | undefined): boolean => {
    if (!href) return false
    if (href === '/') {
      return router.pathname === '/'
    }
    return router.pathname.startsWith(href)
  }

  // Ensure we're only rendering client-side components after hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const toggleDropdown = (index: number): void => {
    if (openDropdown === index) {
      setOpenDropdown(null)
    } else {
      setOpenDropdown(index)
    }
  }

  // Check if any sublinks are active
  const isSubLinkActive = (links: SubLink[]): boolean => {
    if (!links) return false
    return links.some((link) => !link.external && isActive(link.href))
  }

  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header className="mt-4 flex items-center justify-between md:py-10">
          <div>
            <Link passHref href="/" aria-label="Viet-Anh on Software">
              <div className="flex items-center justify-between">
                <div className="mr-0">
                  <span className="text-xl font-bold text-indigo-600 md:text-2xl lg:text-4xl">
                    <Image
                      src={logo}
                      alt="Viet-Anh on Software Logo"
                      width={96}
                      height={96}
                      className="h-20 w-20 md:h-28 md:w-28 ml-0 -rotate-3 hover:scale-105 hover:-rotate-12 transition-all duration-300 rounded-2xl"
                      placeholder="blur"
                      priority={true}
                    />
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex text-base leading-5 flex-row items-center">
            <div className="hidden sm:flex flex-row flex-grow">
              {(headerNavLinks as NavLink[]).map((link, index) =>
                link.links ? (
                  <div key={index} className="relative">
                    <button
                      onClick={() => toggleDropdown(index)}
                      className={`link-underline-fix rounded px-2 py-1 hover:bg-gray-200 sm:px-3 sm:py-2 flex items-center ${
                        isSubLinkActive(link.links)
                          ? 'text-primary font-medium active-link'
                          : 'text-gray-900'
                      }`}
                      aria-label={link?.ariaLabel || link?.title}
                    >
                      {link.icon && (
                        <link.icon
                          className={`h-5 w-5 inline-block ${isSubLinkActive(link.links) ? 'text-primary' : 'text-gray-600'} ${link?.title ? 'mr-1' : ''}`}
                        />
                      )}
                      <span>{link?.title}</span>
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>

                    {openDropdown === index && (
                      <div className="absolute z-10 mt-1 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1">
                        {link.links.map((subLink, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subLink.href}
                            passHref
                            target={subLink.external ? '_blank' : '_self'}
                            className={`block px-4 py-2 text-sm ${
                              isActive(subLink.href) && !subLink.external
                                ? 'text-primary font-medium bg-primary/5 border-l-2 border-primary'
                                : 'text-gray-700'
                            } hover:bg-gray-100 flex items-center`}
                            onClick={() => setOpenDropdown(null)}
                            aria-label={subLink?.ariaLabel || subLink?.title}
                          >
                            {subLink.icon && (
                              <subLink.icon
                                className={`h-4 w-4 inline-block mr-2 ${
                                  isActive(subLink.href) && !subLink.external
                                    ? 'text-primary'
                                    : 'text-gray-600'
                                }`}
                              />
                            )}
                            <span>{subLink?.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    passHref
                    key={index}
                    href={link.href || '#'}
                    target={link?.external ? '_blank' : '_self'}
                    className={`link-underline-fix rounded px-2 py-1 hover:bg-gray-200 sm:px-3 sm:py-2 flex items-center ${
                      isActive(link.href)
                        ? 'text-primary font-medium active-link'
                        : link.highlight
                          ? 'bg-primary/10 text-primary hover:bg-primary/20 font-medium'
                          : 'text-gray-900'
                    }`}
                    aria-label={link?.ariaLabel || link?.title}
                  >
                    {link.icon && (
                      <link.icon
                        className={`h-5 w-5 inline-block ${
                          isActive(link.href) || link.highlight ? 'text-primary' : 'text-gray-600'
                        } ${link?.title ? 'mr-1' : ''}`}
                      />
                    )}
                    <span>{link?.title}</span>
                  </Link>
                )
              )}
            </div>
            {/* <div className="hidden xl:block">
              <DocSearch
                appId={process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || ''}
                indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || ''}
                apiKey={process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || ''}
              />
            </div> */}
            <DropMenu launchpadOpen={launchpadOpen} setLaunchpadOpen={setLaunchpadOpen} />
            <button
              type="button"
              onClick={() => setLaunchpadOpen(true)}
              className="hidden xl:flex -mt-1 ml-6 mr-1 min-w-[70px] rounded-xl bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-950 px-5 py-2 text-sm font-medium text-white md:min-w-[80px] transition-all group"
            >
              <span className="flex items-center">
                <Sparkles className="h-4 w-4 mr-1.5 group-hover:animate-pulse" />
                AI Apps
              </span>
            </button>
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>

      {/* Only render client-side components after hydration */}
      {isMounted && (
        <>
          {/* AI Apps Launchpad */}
          <AIAppsLaunchpad isOpen={launchpadOpen} onClose={() => setLaunchpadOpen(false)} />

          {/* Chat Support Component */}
          <ChatSupportComponent />
        </>
      )}

      {/* Add custom CSS for fixing the underline position */}
      <style jsx global>{`
        .link-underline-fix {
          position: relative;
        }
        .link-underline-fix:after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          display: block;
          margin-top: 0;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0;
          background: currentColor;
          transition: width 0.3s ease;
        }
        .link-underline-fix:hover:after {
          width: calc(100% - 16px);
        }
        .active-link:after {
          width: calc(100% - 16px);
          background: currentColor;
        }
      `}</style>
    </SectionContainer>
  )
}

export default LayoutWrapper
