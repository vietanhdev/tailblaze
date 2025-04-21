import Link from 'next/link'
import React from 'react'

interface MetricCardProps {
  header: string
  link: string
  metric: number
  isCurrency?: boolean
}

export default function MetricCard({
  header,
  link,
  metric,
  isCurrency = false,
}: MetricCardProps): React.ReactElement {
  return (
    <div className="metric-card max-w-72 w-full rounded-lg bg-gray-200 p-4 backdrop-filter transition duration-200 hover:bg-gray-600 hover:bg-opacity-40">
      <Link aria-label={header} target="_blank" rel="noopener noreferrer" href={link} passHref>
        <div className="flex items-center text-gray-900">
          {header}
          <svg
            className="ml-1 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>
      </Link>
      <p className="spacing-sm mt-2 text-3xl font-bold text-black">
        {metric > 0 && isCurrency && '$'}
        {metric > 0 ? metric.toLocaleString() : '-'}
      </p>
    </div>
  )
}
