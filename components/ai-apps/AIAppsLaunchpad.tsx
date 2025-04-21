'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface AIApp {
  id: string
  title: string
  description: string
  icon: string
  bgColor: string
  path: string
  tags: string[]
  status: 'available' | 'coming-soon'
}

const aiApps: AIApp[] = [
  {
    id: 'deepseek-r1',
    title: 'Reasoning Chat - DeepSeek R1',
    description:
      'A lightweight, fast, and efficient AI assistant running completely in your browser with WebGPU.',
    icon: '🤖',
    bgColor: 'from-blue-500 to-cyan-400',
    path: '/ai-apps/deepseek-r1',
    tags: ['LLM', 'Chat', 'WebGPU'],
    status: 'available',
  },
  {
    id: 'speech-to-text',
    title: 'Speech to Text - Whisper V3',
    description: 'Transcribe speech to text without sending audio to a server.',
    icon: '🎤',
    bgColor: 'from-green-500 to-emerald-500',
    path: '/ai-apps/speech-to-text',
    tags: ['Audio', 'STT', 'WebGPU', 'Whisper'],
    status: 'available',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
}

interface AIAppsLaunchpadProps {
  isOpen: boolean
  onClose: () => void
}

interface AppCardProps {
  app: AIApp
  onClose: () => void
}

const AIAppsLaunchpad = ({ isOpen, onClose }: AIAppsLaunchpadProps): React.ReactElement | null => {
  const [isMounted, setIsMounted] = useState(false)

  // Only render on client side to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  // Don't render anything during SSR
  if (!isMounted) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full h-full max-w-7xl mx-auto p-6 pb-20 overflow-y-auto"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-2">
                <span className="text-3xl">✨</span>
                <h2 className="text-3xl font-bold text-white">AI Apps</h2>
                <div className="ml-4 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                  100% client-side processing
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-10 w-10 bg-white/20 hover:bg-white/30 text-white"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {aiApps.map((app) => (
                <AppCard key={app.id} app={app} onClose={onClose} />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function AppCard({ app, onClose }: AppCardProps): React.ReactElement {
  return (
    <motion.div variants={item}>
      <Card className="overflow-hidden transition-all hover:shadow-xl border border-gray-200/20 dark:border-gray-800/50 h-full flex flex-col bg-white/10 backdrop-blur-md text-white hover:scale-105">
        <div className={`h-32 bg-gradient-to-br ${app.bgColor} flex items-center justify-center`}>
          <div className="text-6xl">{app.icon}</div>
        </div>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">{app.title}</CardTitle>
            {app.status === 'coming-soon' && (
              <span className="rounded-full bg-yellow-400/20 backdrop-blur-sm px-2 py-1 text-xs font-medium text-yellow-200">
                Coming Soon
              </span>
            )}
          </div>
          <CardDescription className="mt-2 text-sm text-gray-200">
            {app.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2 flex-grow">
          <div className="flex flex-wrap gap-1.5">
            {app.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-blue-500/20 backdrop-blur-sm px-2 py-1 text-xs font-medium text-blue-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          {app.status === 'available' ? (
            <Link href={app.path} passHref className="w-full" onClick={onClose}>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all">
                Launch App
              </Button>
            </Link>
          ) : (
            <Button
              disabled
              className="w-full opacity-70 bg-gradient-to-r from-gray-400 to-gray-500"
            >
              Coming Soon
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default AIAppsLaunchpad
