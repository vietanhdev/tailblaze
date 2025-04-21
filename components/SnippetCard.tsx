import Link from 'next/link'
import { useRouter } from 'next/router'
import Tag from '@/components/Tag'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Calendar, User, ArrowUpRight } from 'lucide-react'

interface SnippetCardProps {
  slug: string
  title: string
  tags: string[]
  summary?: string
  date?: string
  author?: string
}

export default function SnippetCard({
  slug,
  title,
  tags,
  summary,
  date,
  author,
}: SnippetCardProps) {
  const router = useRouter()

  return (
    <Card
      className="group transform transition duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer h-full flex flex-col border border-gray-200 hover:border-primary-400"
      onClick={() => {
        router.push(`/notes/${slug}`)
      }}
    >
      <CardHeader className="pb-2 flex flex-row justify-between items-start">
        <CardTitle className="text-xl font-semibold text-gray-900">
          <Link
            href={`/notes/${slug}`}
            aria-label={title}
            className="group-hover:text-primary-600 transition-colors"
          >
            {title}
          </Link>
        </CardTitle>
        <ArrowUpRight className="w-12 h-12 text-gray-400 group-hover:text-primary-600 transition-colors" />
      </CardHeader>
      <CardContent className="flex-grow">
        {summary && <p className="text-gray-600 text-sm line-clamp-3">{summary}</p>}
      </CardContent>
      <CardFooter className="pt-2 flex flex-col items-start space-y-2">
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </div>
        {(date || author) && (
          <div className="flex items-center space-x-4 text-xs text-gray-500 pt-1">
            {date && (
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{date}</span>
              </div>
            )}
            {author && (
              <div className="flex items-center space-x-1">
                <User className="w-3 h-3" />
                <span>{author}</span>
              </div>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
