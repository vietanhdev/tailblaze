import { escape } from '@/lib/utils/htmlEscaper'
import siteMetadata from '@/data/siteMetadata'
import { parseDateWithDefaultTimezone } from '@/lib/datetime'

interface Post {
  slug: string
  title: string
  summary?: string
  date: string
  tags?: string[]
}

/**
 * Generate RSS item for a blog post
 * @param post - The post to generate an RSS item for
 * @returns RSS item as a string
 */
const generateRssItem = (post: Post): string => `
  <item>
    <guid>${siteMetadata.siteUrl}/blog/${post.slug}</guid>
    <title>${escape(post.title)}</title>
    <link>${siteMetadata.siteUrl}/blog/${post.slug}</link>
    ${post.summary ? `<description>${escape(post.summary)}</description>` : ''}
    <pubDate>${parseDateWithDefaultTimezone(post.date).toUTCString()}</pubDate>
    <author>${siteMetadata.email} (${siteMetadata.author})</author>
    ${post.tags ? post.tags.map((t) => `<category>${t}</category>`).join('') : ''}
  </item>
`

/**
 * Generate RSS feed for a list of posts
 * @param posts - List of posts to include in the feed
 * @param page - RSS feed file name (defaults to 'feed.xml')
 * @returns Complete RSS feed as a string
 */
const generateRss = (posts: Post[], page: string = 'feed.xml'): string => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(siteMetadata.title)}</title>
      <link>${siteMetadata.siteUrl}/blog</link>
      <description>${escape(siteMetadata.description)}</description>
      <language>${siteMetadata.language}</language>
      <managingEditor>${siteMetadata.email} (${siteMetadata.author})</managingEditor>
      <webMaster>${siteMetadata.email} (${siteMetadata.author})</webMaster>
      <lastBuildDate>${parseDateWithDefaultTimezone(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${siteMetadata.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map(generateRssItem).join('')}
    </channel>
  </rss>
`

export default generateRss
