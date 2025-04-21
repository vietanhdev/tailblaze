import Link from 'next/link'
import React from 'react'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import Tag from '@/components/Tag'
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  TwitterIcon,
  FacebookIcon,
  EmailIcon,
} from 'react-share'

interface Collection {
  collection: string
  [key: string]: any
}

export interface Term {
  name: string | null
  full_name: string | null
  description: string | null
  collections?: Collection[] | null
  source_url?: string | null
  source_title?: string | null
  introduced_year?: string | null
  url?: string
  [key: string]: any
}

interface GlossaryLayoutProps {
  term: Term | null
  next?: Term | null
  prev?: Term | null
  children: React.ReactNode
}

export default function GlossaryLayout({ term, next, prev, children }: GlossaryLayoutProps) {
  const { name, full_name, description, collections } = term || {}
  const slug = name?.toLowerCase()
  const postUrl = `${siteMetadata.siteUrl}/glossary/${slug}`

  // Create a frontMatter-like object for Comments component
  const frontMatter = {
    ...term,
    slug: slug || '',
  }

  return (
    <SectionContainer>
      <PageSEO title={`What is: ${full_name || ''}?`} description={description || ''} />
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-gray-200">
          <header className="pb-5 pt-6">
            <div className="space-y-1 text-center">
              <div>
                <PageTitle>What is: {full_name}?</PageTitle>
              </div>
            </div>
          </header>
          <div
            className="divide-y divide-gray-200 pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <table className="max-w-full">
                <tbody>
                  {term?.source_url && (
                    <tr>
                      <td className="whitespace-nowrap py-2 pr-6 text-sm font-medium text-gray-500">
                        Source
                      </td>
                      <td className="whitespace-nowrap py-2 pr-6 text-sm text-gray-900">
                        <Link
                          passHref
                          target={'_blank'}
                          href={term?.source_url || '#'}
                          aria-label={term?.source_title || ''}
                        >
                          <span className="text-indigo-600 hover:text-indigo-900">
                            {term?.source_title || ''}
                          </span>
                        </Link>
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className="whitespace-nowrap py-2 pr-6 text-sm font-medium text-gray-500">
                      Year
                    </td>
                    <td className="whitespace-nowrap py-2 pr-6 text-sm text-gray-900">
                      {term?.introduced_year || ''}
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap py-2 pr-6 text-sm font-medium text-gray-500">
                      Data Source
                    </td>
                    <td className="whitespace-nowrap py-2 pr-6 text-sm text-gray-900">
                      <Link
                        passHref
                        target={'_blank'}
                        href={term?.url ? term?.url : 'https://paperswithcode.com/about'}
                      >
                        <span className="text-indigo-600 hover:text-indigo-900">
                          CC BY-SA - https://paperswithcode.com
                        </span>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="prose max-w-none pb-8 pt-10">{children}</div>
              <div className="grid place-items-center pb-6 pt-6 text-sm text-gray-700 mt-12">
                <div className="flex items-center space-x-4">
                  <TwitterShareButton
                    url={postUrl}
                    title={full_name || ''}
                    via={siteMetadata.socialAccount.twitter}
                    className="flex items-center overflow-hidden rounded-full hover:scale-110"
                  >
                    <TwitterIcon size={35} round={true} />
                  </TwitterShareButton>
                  <FacebookShareButton
                    url={postUrl}
                    quote={full_name || ''}
                    className="flex items-center overflow-hidden rounded-full hover:scale-110"
                  >
                    <FacebookIcon size={35} round={true} />
                  </FacebookShareButton>
                  <EmailShareButton
                    body={'Check out this blog'}
                    subject={full_name || ''}
                    separator=" : "
                    url={postUrl}
                    className="flex items-center overflow-hidden rounded-full hover:scale-110"
                  >
                    <EmailIcon size={35} round={true} />
                  </EmailShareButton>
                </div>
              </div>
              <Comments frontMatter={frontMatter} />
            </div>
            <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {collections && (
                  <div className="py-4 xl:py-8">
                    <h2 className="pb-1 text-xs uppercase tracking-wide text-gray-500">
                      Collections
                    </h2>
                    <div className="flex flex-wrap">
                      {collections.map((collection, index) => (
                        <Tag key={index} text={collection.collection} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500">
                          Previous Term
                        </h2>
                        <div className="text-primary-600 hover:text-primary-600">
                          <Link
                            passHref
                            href={`/glossary/${prev.name?.toLowerCase() || ''}`}
                            aria-label={prev.full_name || ''}
                          >
                            {prev.full_name || ''}
                          </Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500">Next Term</h2>
                        <div className="text-primary-600 hover:text-primary-600">
                          <Link passHref href={`/glossary/${next.name?.toLowerCase() || ''}`}>
                            {next.full_name || ''}
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  passHref
                  href="/glossary"
                  className="text-primary-600 hover:text-primary-600"
                  aria-label="Back to the glossary list"
                >
                  &larr; Back to the glossary list
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
