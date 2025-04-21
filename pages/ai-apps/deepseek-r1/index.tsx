import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Info } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import LoadingIframe from '@/components/ai-apps/LoadingIframe'
import React from 'react'

export default function DeepSeekR1Page(): React.ReactNode | null {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <Head>
        <title>DeepSeek R1 Chat | Viet Anh's Lab</title>
        <meta
          name="description"
          content="Chat with DeepSeek R1, a powerful AI model running locally in your browser using WebGPU."
        />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center space-x-1">
              <span className="text-2xl mr-1">💬</span>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                DeepSeek R1 Chat
              </h1>
              <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-2 py-0.5 rounded-full ml-2 font-medium">
                WebGPU
              </span>
            </div>

            <div className="flex items-center text-sm text-gray-500 ml-2">
              <Info className="h-3.5 w-3.5 mr-1" />
              <span>DeepSeek R1</span>
            </div>
          </div>

          <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm overflow-hidden">
            <CardContent className="p-0" style={{ height: '650px' }}>
              <LoadingIframe
                src="https://webml-community-deepseek-r1-webgpu.static.hf.space"
                width="850"
                height="650"
                className="w-full h-full"
                title="DeepSeek R1 WebGPU"
                allow="microphone; camera; clipboard-read; clipboard-write"
                sandbox="allow-scripts allow-same-origin allow-forms allow-downloads allow-popups allow-modals"
              />
            </CardContent>
          </Card>

          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <p className="flex items-center">
              <span className="text-xs mr-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-0.5 rounded-full font-medium">
                Note
              </span>
              For best results, use Chrome or Edge with WebGPU support enabled.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
