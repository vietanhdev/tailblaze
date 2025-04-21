'use client'

import Head from 'next/head'
import { usePathname } from 'next/navigation'
import siteMetadata from '@/data/siteMetadata'
import { parseDateWithDefaultTimezone } from '@/lib/datetime'

interface Image {
  url: string
}

interface CommonSEOProps {
  title: string
  description: string
  ogType: string
  ogImage: string | Image[]
  twImage: string
  canonicalUrl?: string
}

interface PageSEOProps {
  title: string
  description: string
}

interface TagSEOProps {
  title: string
  description: string
}

interface Author {
  name: string
  [key: string]: any
}

interface BlogSEOProps {
  authorDetails?: Author[]
  title: string
  summary: string
  date: string
  lastmod?: string
  url: string
  images?: string[] | string
  canonicalUrl?: string
  tags?: string[]
}

interface WebsiteSchema {
  '@context': string
  '@type': string
  '@id': string
  url: string
  name: string
  description: string
  publisher: {
    '@type': string
    name: string
    image: string
  }
  inLanguage: string
}

interface ImageObject {
  '@type': string
  url: string
}

interface StructuredData {
  '@context': string
  '@type': string
  mainEntityOfPage: {
    '@type': string
    '@id': string
  }
  headline: string
  image: ImageObject[]
  datePublished: string
  dateModified: string
  author: any
  publisher: {
    '@type': string
    name: string
    logo: {
      '@type': string
      url: string
    }
  }
  description: string
  isAccessibleForFree: boolean
  inLanguage: string
  keywords: string
}

const CommonSEO = ({
  title,
  description,
  ogType,
  ogImage,
  twImage,
  canonicalUrl,
}: CommonSEOProps) => {
  const pathname = usePathname()
  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="description" content={description} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"
      />
      <meta charSet="utf-8" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={`${siteMetadata.siteUrl}${pathname}`} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      {Array.isArray(ogImage) ? (
        ogImage.map(({ url }) => <meta property="og:image" content={url} key={url} />)
      ) : (
        <meta property="og:image" content={ogImage} key={ogImage} />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteMetadata.twitter} />
      <meta name="twitter:creator" content={siteMetadata.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twImage} />
      <link rel="hreflang" href={`${siteMetadata.siteUrl}${pathname}`} hrefLang="en" />
      <link
        rel="canonical"
        href={canonicalUrl ? canonicalUrl : `${siteMetadata.siteUrl}${pathname}`}
      />
    </Head>
  )
}

export const PageSEO = ({ title, description }: PageSEOProps) => {
  const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
  const twImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
  const pathname = usePathname()

  const websiteSchema: WebsiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteMetadata.siteUrl}/#website`,
    url: siteMetadata.siteUrl,
    name: siteMetadata.title,
    description: siteMetadata.description,
    publisher: {
      '@type': 'Person',
      name: siteMetadata.author,
      image: `${siteMetadata.siteUrl}${siteMetadata.image}`,
    },
    inLanguage: siteMetadata.language,
  }

  return (
    <>
      <CommonSEO
        title={title}
        description={description}
        ogType="website"
        ogImage={ogImageUrl}
        twImage={twImageUrl}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema, null, 2),
          }}
        />
      </Head>
    </>
  )
}

export const TagSEO = ({ title, description }: TagSEOProps) => {
  const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
  const twImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
  const pathname = usePathname()
  return (
    <>
      <CommonSEO
        title={title}
        description={description}
        ogType="website"
        ogImage={ogImageUrl}
        twImage={twImageUrl}
      />
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${description} - RSS feed`}
          href={`${siteMetadata.siteUrl}${pathname}/feed.xml`}
        />
      </Head>
    </>
  )
}

export const BlogSEO = ({
  authorDetails,
  title,
  summary,
  date,
  lastmod,
  url,
  images = [],
  canonicalUrl,
  tags = [],
}: BlogSEOProps) => {
  const publishedAt = parseDateWithDefaultTimezone(date).toISOString()
  const modifiedAt = lastmod ? parseDateWithDefaultTimezone(lastmod).toISOString() : publishedAt

  let imagesArr: string[] =
    images.length === 0
      ? [siteMetadata.socialBanner]
      : typeof images === 'string'
        ? [images]
        : (images as string[])

  const featuredImages = imagesArr.map((img) => {
    return {
      '@type': 'ImageObject',
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  let authorList
  if (authorDetails) {
    authorList = authorDetails.map((author) => {
      return {
        '@type': 'Person',
        name: author.name,
      }
    })
  } else {
    authorList = {
      '@type': 'Person',
      name: siteMetadata.author,
    }
  }

  const structuredData: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    image: featuredImages,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: authorList,
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.author,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
      },
    },
    description: summary,
    isAccessibleForFree: true,
    inLanguage: 'en-US',
    keywords: tags.join(', '),
  }

  const twImageUrl = featuredImages[0].url

  return (
    <>
      <CommonSEO
        title={title}
        description={summary}
        ogType="article"
        ogImage={featuredImages}
        twImage={twImageUrl}
        canonicalUrl={canonicalUrl}
      />
      <Head>
        {date && <meta property="article:published_time" content={publishedAt} />}
        {lastmod && <meta property="article:modified_time" content={modifiedAt} />}
        {tags && tags.map((tag) => <meta property="article:tag" content={tag} key={tag} />)}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData, null, 2),
          }}
        />
      </Head>
    </>
  )
}
