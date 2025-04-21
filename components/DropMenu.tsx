'use client'

import { Fragment, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Menu, Transition } from '@headlessui/react'
import classNames from 'classnames'
import {
  CodeIcon,
  Pencil1Icon,
  HamburgerMenuIcon,
  FrameIcon,
  PersonIcon,
  PaperPlaneIcon,
  RocketIcon,
  VideoIcon,
} from '@radix-ui/react-icons'
import Link from 'next/link'
import { Sparkles, Users } from 'lucide-react'

interface DropMenuProps {
  launchpadOpen: boolean
  setLaunchpadOpen: (open: boolean) => void
}

export default function DropMenu({ launchpadOpen, setLaunchpadOpen }: DropMenuProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(false)

  // Check if the current path matches the link href
  const isActive = (href: string): boolean => {
    if (href === '/') {
      return router.pathname === '/'
    }
    return router.pathname.startsWith(href)
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const toggleIcon = () => {
    setIsOpen(!isOpen)
  }

  // Don't render during SSR
  if (!isMounted) {
    return <div className="ml-2 h-8 w-8 rounded-full bg-gray-300"></div>
  }

  return (
    <Menu as="div" className="relative z-10 inline-block text-left ">
      <div>
        <Menu.Button
          className="ml-2 cursor-pointer rounded-full bg-gray-300 ring-indigo-600 transition-all hover:bg-indigo-600 hover:text-white hover:ring-1"
          aria-label="Menu"
        >
          <div className="flex h-8 w-8 items-center justify-center p-2">
            <HamburgerMenuIcon className="h-4 w-4" />
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        afterEnter={() => {
          toggleIcon()
        }}
        afterLeave={() => {
          toggleIcon()
        }}
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-zinc-300 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }: { active: boolean }) => (
                <button
                  onClick={() => {
                    setLaunchpadOpen(true)
                  }}
                  className={classNames(
                    active ? 'bg-blue-100 text-primary' : 'bg-white text-primary hover:bg-blue-50',
                    'block w-full text-left px-4 py-2 text-sm font-medium'
                  )}
                >
                  <div className="flex flex-row items-center">
                    <Sparkles className="mr-4 mt-0.5 h-4 w-4" /> AI Apps
                  </div>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }: { active: boolean }) => (
                <Link passHref href="/about" aria-label="About">
                  <div
                    className={classNames(
                      active
                        ? 'bg-gray-200 text-gray-700'
                        : isActive('/about')
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'bg-white text-slate-700 hover:bg-gray-300',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    <div className="flex flex-row">
                      <PersonIcon
                        className={classNames(
                          'mr-4 mt-0.5',
                          isActive('/about') ? 'text-primary' : ''
                        )}
                      />{' '}
                      About
                    </div>
                  </div>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }: { active: boolean }) => (
                <Link passHref href="/projects" aria-label="Projects">
                  <div
                    className={classNames(
                      active
                        ? 'bg-gray-200 text-gray-700'
                        : isActive('/projects')
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'bg-white text-slate-700 hover:bg-gray-300',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    <div className="flex flex-row">
                      <RocketIcon
                        className={classNames(
                          'mr-4 mt-0.5',
                          isActive('/projects') ? 'text-primary' : ''
                        )}
                      />{' '}
                      Projects
                    </div>
                  </div>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }: { active: boolean }) => (
                <Link passHref href="/blog" aria-label="Blog">
                  <div
                    className={classNames(
                      active
                        ? 'bg-gray-200 text-gray-700'
                        : isActive('/blog')
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'bg-white text-slate-700 hover:bg-gray-300',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    <div className="flex flex-row">
                      <Pencil1Icon
                        className={classNames(
                          'mr-4 mt-0.5',
                          isActive('/blog') ? 'text-primary' : ''
                        )}
                      />{' '}
                      Blog
                    </div>
                  </div>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }: { active: boolean }) => (
                <Link passHref href="/notes" aria-label="Notes">
                  <div
                    className={classNames(
                      active
                        ? 'bg-gray-200 text-gray-700'
                        : isActive('/notes')
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'bg-white text-slate-700 hover:bg-gray-300',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    <div className="flex flex-row">
                      <CodeIcon
                        className={classNames(
                          'mr-4 mt-0.5',
                          isActive('/notes') ? 'text-primary' : ''
                        )}
                      />{' '}
                      Notes
                    </div>
                  </div>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }: { active: boolean }) => (
                <Link passHref href="/contact" aria-label="Contact">
                  <div
                    className={classNames(
                      active
                        ? 'bg-gray-200 text-gray-700'
                        : isActive('/contact')
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'bg-white text-zinc-700 hover:bg-gray-300',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    <div className="flex flex-row">
                      <PaperPlaneIcon
                        className={classNames(
                          'mr-4 mt-0.5',
                          isActive('/contact') ? 'text-primary' : ''
                        )}
                      />{' '}
                      Contact
                    </div>
                  </div>
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }: { active: boolean }) => (
                <div
                  className={classNames(
                    active
                      ? 'bg-gray-200 text-gray-700'
                      : isActive('/videos')
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'bg-white text-slate-700',
                    'block px-4 py-2 text-sm font-medium'
                  )}
                >
                  <div className="flex flex-row items-center">
                    <Users
                      className={classNames(
                        'mr-4 mt-0.5 h-4 w-4',
                        isActive('/videos') ? 'text-primary' : ''
                      )}
                    />{' '}
                    Social
                  </div>
                </div>
              )}
            </Menu.Item>
            <div className="pl-4">
              <Menu.Item>
                {({ active }: { active: boolean }) => (
                  <Link passHref href="/videos" aria-label="Videos">
                    <div
                      className={classNames(
                        active
                          ? 'bg-gray-200 text-gray-700'
                          : isActive('/videos')
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'bg-white text-slate-700 hover:bg-gray-300',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      <div className="flex flex-row">
                        <VideoIcon
                          className={classNames(
                            'mr-4 mt-0.5',
                            isActive('/videos') ? 'text-primary' : ''
                          )}
                        />{' '}
                        Videos
                      </div>
                    </div>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }: { active: boolean }) => (
                  <Link
                    passHref
                    href="https://github.com/vietanhdev/tailblaze"
                    target="_blank"
                    aria-label="TailBlaze Repository"
                  >
                    <div
                      className={classNames(
                        active
                          ? 'bg-gray-200 text-gray-700'
                          : 'bg-white text-slate-700 hover:bg-gray-300',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      <div className="flex flex-row">
                        <svg
                          className="mr-4 mt-0.5 h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                        </svg>
                        TailBlaze
                      </div>
                    </div>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }: { active: boolean }) => (
                  <Link
                    passHref
                    href="https://linkedin.com/in/vietanhdev"
                    target="_blank"
                    aria-label="LinkedIn Profile"
                  >
                    <div
                      className={classNames(
                        active
                          ? 'bg-gray-200 text-gray-700'
                          : 'bg-white text-slate-700 hover:bg-gray-300',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      <div className="flex flex-row">
                        <svg
                          className="mr-4 mt-0.5 h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                        </svg>
                        LinkedIn
                      </div>
                    </div>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }: { active: boolean }) => (
                  <Link
                    passHref
                    href="https://github.com/vietanhdev"
                    target="_blank"
                    aria-label="GitHub Profile"
                  >
                    <div
                      className={classNames(
                        active
                          ? 'bg-gray-200 text-gray-700'
                          : 'bg-white text-slate-700 hover:bg-gray-300',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      <div className="flex flex-row">
                        <svg
                          className="mr-4 mt-0.5 h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                        </svg>
                        GitHub
                      </div>
                    </div>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }: { active: boolean }) => (
                  <Link
                    passHref
                    href="https://twitter.com/vietanhdev"
                    target="_blank"
                    aria-label="Twitter Profile"
                  >
                    <div
                      className={classNames(
                        active
                          ? 'bg-gray-200 text-gray-700'
                          : 'bg-white text-slate-700 hover:bg-gray-300',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      <div className="flex flex-row">
                        <svg
                          className="mr-4 mt-0.5 h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                        </svg>
                        Twitter
                      </div>
                    </div>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }: { active: boolean }) => (
                  <Link
                    passHref
                    href="https://www.youtube.com/@vietanhdev"
                    target="_blank"
                    aria-label="YouTube Channel"
                  >
                    <div
                      className={classNames(
                        active
                          ? 'bg-gray-200 text-gray-700'
                          : 'bg-white text-slate-700 hover:bg-gray-300',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      <div className="flex flex-row">
                        <svg
                          className="mr-4 mt-0.5 h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                        </svg>
                        YouTube
                      </div>
                    </div>
                  </Link>
                )}
              </Menu.Item>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
