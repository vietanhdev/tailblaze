import React, { useState, useEffect, useRef } from 'react'
import { Loader2 } from 'lucide-react'

interface LoadingIframeProps {
  src: string
  title: string
  width?: string | number
  height?: string | number
  className?: string
  allow?: string
  sandbox?: string
}

const LoadingIframe: React.FC<LoadingIframeProps> = ({
  src,
  title,
  width,
  height,
  className,
  allow,
  sandbox,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [loadingFailed, setLoadingFailed] = useState<boolean>(false)
  const [loadingTimeout, setLoadingTimeout] = useState<boolean>(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const startTimeRef = useRef<number>(Date.now())
  const hasLoadedRef = useRef<boolean>(false)

  // Force hide loading after 20 seconds (failsafe)
  useEffect(() => {
    const forceHideTimeout = setTimeout(() => {
      setIsLoading(false)
    }, 20000)

    return () => clearTimeout(forceHideTimeout)
  }, [])

  useEffect(() => {
    // Reset states when src changes
    setIsLoading(true)
    setLoadingFailed(false)
    setLoadingTimeout(false)
    startTimeRef.current = Date.now()
    hasLoadedRef.current = false

    // Set a timeout of 10 seconds to show a timeout message
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        setLoadingTimeout(true)
      }
    }, 10000)

    return () => clearTimeout(timeoutId)
  }, [src, isLoading])

  const handleLoad = (): void => {
    console.log('Iframe loaded')
    hasLoadedRef.current = true
    setLoadingTimeout(false)

    const currentTime = Date.now()
    const elapsedTime = currentTime - startTimeRef.current
    const minLoadingTime = 2000 // 2 seconds minimum loading time

    if (elapsedTime >= minLoadingTime) {
      // If 2 seconds have already passed, hide loading immediately
      setIsLoading(false)
    } else {
      // Otherwise, wait until 3 seconds have passed
      const remainingTime = minLoadingTime - elapsedTime
      setTimeout(() => {
        setIsLoading(false)
      }, remainingTime)
    }
  }

  const handleError = (): void => {
    console.log('Iframe failed to load')
    setIsLoading(false)
    setLoadingFailed(true)
  }

  // Add manual checking for iframe loaded state
  useEffect(() => {
    const iframe = iframeRef.current
    if (iframe) {
      // Try to check if the iframe has already loaded
      if (
        (iframe as any).complete ||
        (iframe.contentWindow && iframe.contentWindow.document.readyState === 'complete')
      ) {
        handleLoad()
      }

      // Add event listeners
      iframe.addEventListener('load', handleLoad)
      iframe.addEventListener('error', handleError)

      return () => {
        iframe.removeEventListener('load', handleLoad)
        iframe.removeEventListener('error', handleError)
      }
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      {(isLoading || loadingFailed) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800">
          {loadingFailed ? (
            <div className="text-center">
              <div className="text-red-500 mb-2">Failed to load content</div>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Reload
              </button>
            </div>
          ) : (
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-2 mx-auto" />
              <div className="text-gray-700 dark:text-gray-300">
                {loadingTimeout
                  ? "Taking longer than expected... This application requires WebGPU. Make sure you're using a compatible browser (Chrome/Edge)."
                  : 'Loading application...'}
              </div>
              {loadingTimeout && (
                <button
                  onClick={() => setIsLoading(false)}
                  className="mt-4 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
                >
                  Show content anyway
                </button>
              )}
            </div>
          )}
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={src}
        onLoad={handleLoad}
        onError={handleError}
        frameBorder="0"
        width={width || '100%'}
        height={height || '650'}
        className={className}
        title={title}
        allow={allow}
        sandbox={sandbox}
        style={{ opacity: isLoading ? 0 : 1 }}
      />
    </div>
  )
}

export default LoadingIframe
