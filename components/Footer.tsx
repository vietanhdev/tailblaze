import Link from 'next/link'
import { useRef, useEffect } from 'react'
import logo from 'public/logo.png'
import Image from 'next-image-export-optimizer'

const currentYear = new Date().getFullYear()

export default function Footer() {
  const pageSpeedEl = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!pageSpeedEl.current) return
    pageSpeedEl.current.setAttribute(
      'href',
      `https://pagespeed.web.dev/report?url=${window.location.href}`
    )
  }, [])

  return (
    <footer>
      <div className="mt-20 mb-20 flex flex-col items-center">
        <Image
          src={logo}
          alt="Viet-Anh on Software Logo"
          width={32}
          height={32}
          className="mb-3 h-16 w-16 grayscale hover:!grayscale-0 transition duration-300"
          placeholder="blur"
        />
        <div className="hidden text-sm text-gray-700 md:flex">
          <div className="mx-1">
            <Link href="https://www.vietanh.dev" className="link-underline" aria-label="Viet Anh">
              {`Viet Anh © ${currentYear}`}
            </Link>
          </div>
          {`•`}
          <div className="mx-1">
            <Link
              target={'_blank'}
              ref={pageSpeedEl}
              href={`https://pagespeed.web.dev/report?url=https://www.vietanh.dev`}
              className="link-underline"
              rel="noreferrer"
            >
              &gt;&nbsp;PageSpeed
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
