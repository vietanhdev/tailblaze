import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="bg-gray-50">
      <main id="skip" className="flex flex-col justify-center bg-gray-50 px-8">
        {children}
      </main>
    </div>
  )
}
