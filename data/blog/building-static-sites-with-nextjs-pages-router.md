---
title: Building Static Sites with Next.js Pages Router - The Complete Guide
date: 2024-02-05 00:00:00 Z
categories: ['Web Development']
tags:
  - Next.js
  - Static Sites
  - Pages Router
  - SSG
  - Performance
image: /static/images/nextjs-static-site.jpg
math: false
draft: false
summary: Learn how to leverage Next.js Pages Router to build blazing-fast static sites with perfect performance scores. This guide covers setup, optimization, deployment strategies, and advanced techniques.
---

# Building Static Sites with Next.js Pages Router

Next.js has established itself as one of the most powerful React frameworks for building modern web applications. While the App Router gets much attention these days, the Pages Router remains an excellent choice for static site generation, offering a perfect blend of developer experience, performance, and flexibility.

## Why Choose Pages Router for Static Sites?

The Pages Router in Next.js has several advantages for static site generation:

- **Maturity and stability** - Battle-tested over many years
- **Simpler mental model** - File-based routing with predictable behavior
- **Static export** - Easy generation of fully static HTML files
- **Incremental Static Regeneration (ISR)** - Update static content without full rebuilds
- **API Routes** - Backend functionality without a separate server
- **Plugin ecosystem** - Wide range of compatible plugins and tools

## Setting Up a Static Next.js Project

Let's start by creating a new Next.js project configured for static site generation:

```bash
# Create a new project
pnpm create next-app my-static-site --typescript

# Navigate to the project
cd my-static-site
```

Next, configure your `next.config.js` for static exports:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './lib/image-loader.js',
  },
}

module.exports = nextConfig
```

Create the custom image loader at `lib/image-loader.js`:

```javascript
export default function imageLoader({ src, width, quality }) {
  return `${src}?w=${width}&q=${quality || 75}`
}
```

## Understanding the Pages Router Structure

The Pages Router follows a simple convention-based approach:

- `/pages/index.js` → `/` (home page)
- `/pages/about.js` → `/about` (about page)
- `/pages/blog/[slug].js` → `/blog/:slug` (dynamic blog posts)
- `/pages/api/hello.js` → `/api/hello` (API endpoint)

This predictable structure makes it easy to organize your code and understand the routing.

## Data Fetching Strategies for Static Sites

Next.js provides several methods for fetching data at build time:

### 1. getStaticProps

This function runs at build time to fetch data for a page:

```typescript
import type { GetStaticProps } from 'next'

type Post = {
  title: string
  content: string
}

type Props = {
  post: Post
}

export default function BlogPost({ post }: Props) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  // Fetch data from an API, database, or file system
  const post = await fetch('https://api.example.com/posts/1').then(res => res.json())
  
  return {
    props: {
      post,
    },
  }
}
```

### 2. getStaticPaths

For dynamic routes, define which paths should be pre-rendered:

```typescript
import type { GetStaticPaths, GetStaticProps } from 'next'

type Post = {
  id: string
  title: string
  content: string
}

type Props = {
  post: Post
}

export default function BlogPost({ post }: Props) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all post slugs
  const posts = await fetch('https://api.example.com/posts').then(res => res.json())
  
  const paths = posts.map((post: Post) => ({
    params: { slug: post.id },
  }))
  
  return {
    paths,
    fallback: false, // 404 for any paths not returned by getStaticPaths
  }
}

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({ params }) => {
  // Fetch specific post data
  const post = await fetch(`https://api.example.com/posts/${params?.slug}`).then(res => res.json())
  
  return {
    props: {
      post,
    },
  }
}
```

### 3. Using Local Data

For blog sites, you might prefer local Markdown or MDX files:

```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { GetStaticProps } from 'next'

type Post = {
  slug: string
  title: string
  date: string
  excerpt: string
}

type Props = {
  posts: Post[]
}

export default function Blog({ posts }: Props) {
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const postsDirectory = path.join(process.cwd(), 'data/posts')
  const filenames = fs.readdirSync(postsDirectory)
  
  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, excerpt } = matter(fileContents, { excerpt: true })
    
    return {
      slug: filename.replace(/\.md$/, ''),
      title: data.title,
      date: data.date,
      excerpt: excerpt || '',
    }
  })
  
  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  return {
    props: {
      posts: sortedPosts,
    },
  }
}
```

## Optimizing Images for Static Export

Image optimization is crucial for static sites. With the `next-image-export-optimizer` package, you can achieve optimal image sizes without a server:

First, install the package:

```bash
pnpm add next-image-export-optimizer
```

Update your `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './node_modules/next-image-export-optimizer/build/loader.js',
  },
  env: {
    nextImageExportOptimizer_imageFolderPath: 'public/images',
    nextImageExportOptimizer_exportFolderPath: 'out',
    nextImageExportOptimizer_quality: 75,
    nextImageExportOptimizer_storePicturesInWEBP: true,
    nextImageExportOptimizer_generateAndUseBlurImages: true,
  },
}

module.exports = nextConfig
```

Then use the optimized images in your components:

```tsx
import ExportedImage from "next-image-export-optimizer";

export default function Hero() {
  return (
    <div className="relative h-96 w-full">
      <ExportedImage
        src="/images/hero.jpg"
        alt="Hero image"
        fill
        priority
        className="object-cover"
      />
    </div>
  );
}
```

## SEO Best Practices for Static Sites

Static sites are ideal for SEO, and Next.js makes optimization easy:

```tsx
// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

For page-specific SEO, use the `next/head` component:

```tsx
import Head from 'next/head'

type PageSEOProps = {
  title: string
  description: string
  canonicalUrl?: string
  ogImageUrl?: string
}

export default function PageSEO({
  title,
  description,
  canonicalUrl,
  ogImageUrl = '/images/og-default.jpg',
}: PageSEOProps) {
  const fullTitle = `${title} | My Site Name`
  
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Head>
  )
}
```

## Deployment Strategies

Static Next.js sites can be deployed virtually anywhere:

### Vercel (Recommended)

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

### Cloudflare Pages

```bash
# Build the site
pnpm build

# Deploy using Cloudflare dashboard or CLI
```

### Netlify

Create a `netlify.toml` file:

```toml
[build]
  command = "pnpm build"
  publish = "out"
```

## Advanced Techniques

### 1. RSS Feed Generation

Generate an RSS feed during the build process:

```typescript
// scripts/generate-rss.js
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const { Feed } = require('feed')

const generateRssFeed = async () => {
  const posts = getAllPosts()
  const site_url = 'https://yourdomain.com'
  
  const feedOptions = {
    title: 'Your Site Title',
    description: 'Your site description',
    id: site_url,
    link: site_url,
    image: `${site_url}/favicon.png`,
    favicon: `${site_url}/favicon.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    generator: 'Next.js using Feed',
    feedLinks: {
      rss2: `${site_url}/rss.xml`,
    },
  }
  
  const feed = new Feed(feedOptions)
  
  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${site_url}/blog/${post.slug}`,
      link: `${site_url}/blog/${post.slug}`,
      description: post.excerpt,
      date: new Date(post.date),
    })
  })
  
  fs.writeFileSync('./public/rss.xml', feed.rss2())
}

// Add to package.json scripts:
// "prebuild": "node scripts/generate-rss.js"
```

### 2. Sitemap Generation

Similarly, create a sitemap during build:

```typescript
// scripts/generate-sitemap.js
const fs = require('fs')
const globby = require('globby')
const prettier = require('prettier')

async function generateSitemap() {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')
  const pages = await globby([
    'pages/**/*.tsx',
    'data/blog/**/*.md',
    '!pages/_*.tsx',
    '!pages/api',
  ])
  
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => {
          const path = page
            .replace('pages', '')
            .replace('data/blog', '/blog')
            .replace('.tsx', '')
            .replace('.md', '')
          const route = path === '/index' ? '' : path
          
          return `
            <url>
              <loc>${`https://yourdomain.com${route}`}</loc>
              <changefreq>daily</changefreq>
              <priority>0.7</priority>
            </url>
          `
        })
        .join('')}
    </urlset>
  `
  
  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  })
  
  fs.writeFileSync('public/sitemap.xml', formatted)
}

generateSitemap()
```

## Conclusion

The Pages Router in Next.js remains an excellent choice for building static sites, offering a perfect balance of simplicity, performance, and developer experience. By following the practices outlined in this guide, you can create blazing-fast static sites with perfect lighthouse scores, excellent SEO, and a great user experience.

Whether you're building a personal blog, a corporate website, or a documentation site, the Next.js Pages Router provides all the tools you need to succeed while keeping the development process straightforward and enjoyable. 