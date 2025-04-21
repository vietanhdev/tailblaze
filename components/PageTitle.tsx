import { ReactNode } from 'react'

interface PageTitleProps {
  children: ReactNode
}

export default function PageTitle({ children }: PageTitleProps) {
  return (
    <h1 className="md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl mt-4 sm:leading-10 md:text-5xl font-title">
      {children}
    </h1>
  )
}
