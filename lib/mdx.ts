import { bundleMDX } from 'mdx-bundler'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'
import getAllFilesRecursively from './utils/files'
// Remark packages
import remarkGfm from 'remark-gfm'
import remarkFootnotes from 'remark-footnotes'
import remarkMath from 'remark-math'
import remarkExtractFrontmatter from './remark-extract-frontmatter'
import remarkCodeTitles from './remark-code-title'
import remarkTocHeadings from './remark-toc-headings'
import remarkImgToJsx from './remark-img-to-jsx'
// Rehype packages
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeCitation from 'rehype-citation'
import rehypePrismPlus from 'rehype-prism-plus'
// import rehypePresetMinify from 'rehype-preset-minify'; // Removed due to compatibility issues with React 19
import { parseDateWithDefaultTimezone } from './datetime'

const root = process.cwd()

export interface Heading {
  value: string
  depth: number
  url: string
}

// Define ReadingTime interface for the reading-time package
export interface ReadingTime {
  text: string
  minutes: number
  time: number
  words: number
}

export interface FrontMatter {
  title: string
  date: string | null
  tags?: string[]
  lastmod?: string
  draft?: boolean
  summary?: string
  images?: string[]
  image?: string
  authors?: string[]
  layout?: string
  canonicalUrl?: string
  slug: string | null
  fileName: string
  readingTime: ReadingTime
  external?: string | null
  [key: string]: any
}

export function getFiles(type: string): string[] {
  const prefixPaths = path.join(root, 'data', type)
  if (!fs.existsSync(prefixPaths)) return []
  const files = getAllFilesRecursively(prefixPaths)
  // Only want to return blog/path and ignore root, replace is needed to work on Windows
  return files.map((file) => file.slice(prefixPaths.length + 1).replace(/\\/g, '/'))
}

export function formatSlug(slug: string): string {
  return slug.replace(/\.(mdx|md)/, '')
}

export function dateSortDesc(a: string, b: string): number {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export async function getFileBySlug(
  type: string,
  slug: string
): Promise<{
  mdxSource: string
  toc: Heading[]
  frontMatter: FrontMatter
}> {
  const mdxPath = path.join(root, 'data', type, `${slug}.mdx`)
  const mdPath = path.join(root, 'data', type, `${slug}.md`)
  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, 'utf8')
    : fs.readFileSync(mdPath, 'utf8')

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'esbuild.exe')
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'bin', 'esbuild')
  }

  let toc: Heading[] = []

  const { code, frontmatter } = await bundleMDX({
    source,
    // mdx imports can be automatically source from the components directory
    cwd: path.join(root, 'components'),
    xdmOptions(options) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkExtractFrontmatter,
        [remarkTocHeadings, { exportRef: toc }],
        remarkGfm,
        remarkCodeTitles,
        [remarkFootnotes, { inlineNotes: true }],
        remarkMath,
        remarkImgToJsx,
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeKatex,
        [rehypeCitation, { path: path.join(root, 'data') }],
        [rehypePrismPlus, { ignoreMissing: true }],
        // rehypePresetMinify, // Removed due to compatibility issues with React 19
      ]
      return options
    },
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        '.js': 'jsx',
      }
      return options
    },
  })

  // Refine frontmatter's image and images
  if (frontmatter.image && !frontmatter.images) {
    frontmatter.images = [frontmatter.image]
  }

  // Generate summary if not provided
  if (!frontmatter.summary) {
    let summary = source

    // Convert links and images to plain text
    summary = summary.replace(/\[(.*?)\]\((.*?)\)/g, (match, p1) => p1)
    summary = summary.replace(/!\[(.*?)\]\((.*?)\)/g, (match, p1) => p1)

    // Remove _ and * from markdown
    summary = summary.replace(/(_|\*)/g, '')

    // Remove frontmatter
    summary = summary.replace(/---(.|\n)*---/, '')

    // Remove all double newlines
    summary = summary.replace(/\n\n/g, ' ')

    // Use first paragraph or 320 characters as summary
    const summaryChars = summary.split('')
    summary = summaryChars.slice(0, 320).join('')

    // Add ellipsis if summary is longer than 320 characters
    if (summary.length >= 320) {
      summary += '...'
    }

    // Trim and simplify whitespace and format
    summary = summary.trim().replace(/\s+/g, ' ')

    if (summary) {
      frontmatter.summary = summary
    }
  }

  return {
    mdxSource: code,
    toc,
    frontMatter: {
      readingTime: readingTime(code) as ReadingTime,
      slug: slug || null,
      fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      ...frontmatter,
      title: frontmatter.title || '', // Ensure title exists
      date: frontmatter.date ? parseDateWithDefaultTimezone(frontmatter.date).toISOString() : null,
    } as FrontMatter,
  }
}

export async function getAllFilesFrontMatter(folder: string): Promise<FrontMatter[]> {
  const prefixPaths = path.join(root, 'data', folder)

  const files = getAllFilesRecursively(prefixPaths)

  const allFrontMatter: FrontMatter[] = []

  files.forEach((file) => {
    // Replace is needed to work on Windows
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/')
    // Remove Unexpected File
    if (path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx') {
      return
    }
    const source = fs.readFileSync(file, 'utf8')
    const { data: frontmatter } = matter(source)

    // Refine frontmatter's image and images
    if (frontmatter.image && !frontmatter.images) {
      frontmatter.images = [frontmatter.image]
    }

    // Generate summary if not provided
    if (!frontmatter.summary) {
      let summary = source

      // Convert links and images to plain text
      summary = summary.replace(/\[(.*?)\]\((.*?)\)/g, (match, p1) => p1)
      summary = summary.replace(/!\[(.*?)\]\((.*?)\)/g, (match, p1) => p1)

      // Remove _ and * from markdown
      summary = summary.replace(/(_|\*)/g, '')

      // Remove frontmatter
      summary = summary.replace(/---(.|\n)*---/, '')

      // Remove all double newlines
      summary = summary.replace(/\n\n/g, ' ')

      // Use first paragraph or 320 characters as summary
      const summaryChars = summary.split('')
      summary = summaryChars.slice(0, 320).join('')

      // Add ellipsis if summary is longer than 320 characters
      if (summary.length >= 320) {
        summary += '...'
      }

      // Trim and simplify whitespace and format
      summary = summary.trim().replace(/\s+/g, ' ')

      if (summary) {
        frontmatter.summary = summary
      }
    }

    if (frontmatter.draft !== true) {
      allFrontMatter.push({
        ...frontmatter,
        title: frontmatter.title || '', // Ensure title exists
        slug: formatSlug(fileName),
        date: frontmatter.date
          ? parseDateWithDefaultTimezone(frontmatter.date).toISOString()
          : null,
        external: frontmatter.external ? frontmatter.external : null,
      } as FrontMatter)
    }
  })

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date || '', b.date || ''))
}
