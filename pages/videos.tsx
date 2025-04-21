import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import { useState, useEffect } from 'react'
import React from 'react'

interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  publishedAt: string
}

export default function Videos(): React.ReactNode {
  const [videos, setVideos] = useState<Video[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  // Fetch videos client-side when component mounts
  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('https://api.vietanh.dev/api/youtube-videos')

        if (!response.ok) {
          throw new Error(`Failed to fetch videos: ${response.statusText} ${response.status}`)
        }

        const data = await response.json()
        setVideos(data.videos || [])
        setError(null)
      } catch (error) {
        console.error('Error fetching YouTube videos:', error)
        setError('Failed to load videos')
        setVideos([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchVideos()
  }, [])

  // Handler to open the modal
  const openModal = (video: Video): void => {
    setSelectedVideo(video)
    document.body.style.overflow = 'hidden' // Prevent scrolling when modal is open
  }

  // Handler to close the modal
  const closeModal = (): void => {
    setSelectedVideo(null)
    document.body.style.overflow = 'auto' // Restore scrolling
  }

  // Format date like "January 1, 2023"
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <>
      <PageSEO
        title={`Videos - ${siteMetadata.author}`}
        description="YouTube videos by Viet Anh Nguyen on programming, software development and tech tutorials."
      />
      <div className="mx-auto max-w-6xl">
        <div className="space-y-4 pt-8 md:space-y-6">
          <h1 className="text-4xl font-bold leading-tight tracking-tighter text-gray-900 sm:text-5xl md:text-6xl">
            Videos
          </h1>
          <p className="text-lg leading-7 text-gray-500">
            Latest videos from my YouTube channel{' '}
            <a
              href="https://www.youtube.com/@vietanhdotdev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800"
            >
              @vietanhdotdev
            </a>
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="mb-4 text-lg text-red-600">{error}</p>
            <a
              href="https://www.youtube.com/@vietanhdotdev"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-medium text-white hover:bg-indigo-700"
            >
              Visit YouTube Channel
            </a>
          </div>
        ) : videos.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6 py-8 md:grid-cols-2 xl:grid-cols-3">
            {videos.map((video) => (
              <li key={video.id} className="py-2">
                <div
                  className="h-full bg-opacity-20 px-2 transition duration-100 hover:scale-105 hover:rounded-xl cursor-pointer"
                  onClick={() => openModal(video)}
                >
                  <div className="h-full w-full overflow-hidden">
                    <div className="flex flex-col">
                      <div className="relative aspect-w-16 aspect-h-9 w-full rounded-lg border-[1px] border-gray-300 overflow-hidden group">
                        {/* Thumbnail image */}
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200">
                          <div className="w-12 h-12 rounded-full bg-white bg-opacity-80 flex items-center justify-center opacity-70 group-hover:opacity-90 transform group-hover:scale-105 transition-all duration-200 shadow-md">
                            <svg
                              className="w-6 h-6 text-red-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="p-1 mt-2">
                        <h2 className="block text-lg font-medium leading-tight text-gray-900 transition duration-500 ease-in-out hover:text-primary-600 line-clamp-2">
                          {video.title}
                        </h2>
                        <div className="text-xs font-normal leading-6 text-gray-500">
                          <time dateTime={video.publishedAt}>{formatDate(video.publishedAt)}</time>
                        </div>
                        <p className="mt-2 text-sm text-slate-800 line-clamp-2">
                          {video.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="mb-4 text-lg text-gray-600">
              No videos found. Please check out the YouTube channel directly.
            </p>
            <a
              href="https://www.youtube.com/@vietanhdotdev"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-medium text-white hover:bg-indigo-700"
            >
              Visit YouTube Channel
            </a>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-lg w-full max-w-4xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black bg-opacity-70 flex items-center justify-center text-white hover:bg-opacity-100 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <div className="absolute inset-0">
                <LiteYouTubeEmbed
                  id={selectedVideo.id}
                  title={selectedVideo.title}
                  poster="maxresdefault"
                  noCookie={true}
                />
              </div>
            </div>

            <div className="p-4 bg-white">
              <h2 className="text-xl font-semibold mb-2">{selectedVideo.title}</h2>
              <p className="text-xs text-gray-500 mb-3">
                <time dateTime={selectedVideo.publishedAt}>
                  {formatDate(selectedVideo.publishedAt)}
                </time>
              </p>
              <p className="text-sm text-gray-700">{selectedVideo.description}</p>
              <div className="mt-4 flex justify-end">
                <a
                  href={`https://www.youtube.com/watch?v=${selectedVideo.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  Watch on YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
