import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import Link from 'next/link'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import React from 'react'

export default function FourZeroFour(): React.ReactNode {
  const router = useRouter()

  useEffect(() => {
    // Log the path that caused the 404 for debugging
    console.error(`404 error: Page not found - ${router.asPath}`)

    // You could also send this to an error tracking service if needed
  }, [router.asPath])

  return (
    <>
      <PageSEO
        title={`Page Not Found - ${siteMetadata.title}`}
        description="The page you're looking for doesn't exist or has been moved."
      />
      <Head>
        <meta name="robots" content="noindex,follow" />
      </Head>
      <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6">
        <div className="space-x-2 pb-8 pt-6 md:space-y-5">
          <h1 className="md:leading-14 text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:px-3 md:text-8xl">
            404
          </h1>
        </div>
        <div className="mx-auto max-w-2xl">
          <div className="md:border-l-2 md:pl-6">
            <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">Page Not Found</p>
            <p className="mb-4">
              The page you're looking for doesn't exist or may have been moved. If you were
              redirected here from another site, the link might be outdated.
            </p>
            <p className="mb-4">
              If you believe this is an error, please contact us and include the URL you were trying
              to access.
            </p>
            <p>You can find what you're looking for on our homepage.</p>
          </div>
        </div>
      </div>
      <div className="mt-16 grid place-items-center">
        <Link href="/" passHref aria-label="Return to Homepage">
          <button
            aria-label="Return to Homepage"
            type="button"
            className="inline-flex items-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
          >
            Return to Homepage
          </button>
        </Link>
      </div>
    </>
  )
}
