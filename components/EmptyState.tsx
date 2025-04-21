import { FileText, Search } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description: string
  icon?: 'search' | 'content'
}

export default function EmptyState({ title, description, icon = 'content' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="bg-gray-100 rounded-full p-4 mb-4">
        {icon === 'search' ? (
          <Search className="h-10 w-10 text-gray-400" />
        ) : (
          <FileText className="h-10 w-10 text-gray-400" />
        )}
      </div>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <p className="mt-2 text-gray-600 max-w-md">{description}</p>
    </div>
  )
}
