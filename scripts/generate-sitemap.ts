import fs from 'fs'
import globby from 'globby'
import matter from 'gray-matter'
import prettier from 'prettier'
import siteMetadata from '../data/siteMetadata'

interface FrontMatter {
  draft?: boolean
  canonicalUrl?: string
  lastmod?: string
  date?: string
}

;(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')
  const pages = await globby([
    'pages/*.js',
    'pages/*.tsx',
    'data/blog/**/*.mdx',
    'data/blog/**/*.md',
    'data/notes/**/*.md',
    'data/notes/**/*.mdx',
    'public/tags/**/*.xml',
    '!pages/_*.js',
    '!pages/_*.tsx',
    '!pages/api',
  ])

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
            ${pages
              .map((page) => {
                // Exclude drafts from the sitemap
                if (page.search('.md') >= 1 && fs.existsSync(page)) {
                  const source = fs.readFileSync(page, 'utf8')
                  const fm = matter(source)
                  const frontmatter = fm.data as FrontMatter
                  if (frontmatter.draft) {
                    return
                  }
                  if (frontmatter.canonicalUrl) {
                    return
                  }
                }
                const path = page
                  .replace('pages/', '/')
                  .replace('data/blog', '/blog')
                  .replace('data/notes', '/notes')
                  .replace('public/', '/')
                  .replace('.js', '')
                  .replace('.tsx', '')
                  .replace('.mdx', '')
                  .replace('.md', '')
                  .replace('/feed.xml', '')
                const route = path === '/index' ? '' : path

                if (page.search('pages/404.') > -1 || page.search(`pages/blog/[...slug].`) > -1) {
                  return
                }

                // Determine priority and change frequency
                let priority = '0.7'
                let changefreq = 'weekly'

                // Assign higher priority to important pages
                if (route === '' || route === '/blog') {
                  priority = '1.0'
                  changefreq = 'daily'
                } else if (route.startsWith('/blog/')) {
                  priority = '0.8'
                }

                // Determine lastmod date for content
                let lastmod = new Date().toISOString()
                if (page.search('.md') >= 1 && fs.existsSync(page)) {
                  const source = fs.readFileSync(page, 'utf8')
                  const fm = matter(source)
                  const frontmatter = fm.data as FrontMatter
                  if (frontmatter.lastmod) {
                    lastmod = new Date(frontmatter.lastmod).toISOString()
                  } else if (frontmatter.date) {
                    lastmod = new Date(frontmatter.date).toISOString()
                  }
                }

                return `
                        <url>
                            <loc>${siteMetadata.siteUrl}${route}</loc>
                            <lastmod>${lastmod}</lastmod>
                            <changefreq>${changefreq}</changefreq>
                            <priority>${priority}</priority>
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

  // eslint-disable-next-line no-sync
  fs.writeFileSync('public/sitemap.xml', await formatted)
})()
