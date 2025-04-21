'use client'

import React, { useState } from 'react'

import siteMetadata from '@/data/siteMetadata'

// Extend Window interface for Disqus
declare global {
  interface Window {
    disqus_config?: any
    DISQUS?: {
      reset: (options: { reload: boolean }) => void
    }
  }
}

interface FrontMatter {
  slug: string
  [key: string]: any
}

interface DisqusConfig {
  page: {
    url: string
    identifier: string
  }
}

interface DisqusProps {
  frontMatter: FrontMatter
}

const Disqus = ({ frontMatter }: DisqusProps): React.ReactElement => {
  const [enableLoadComments, setEnabledLoadComments] = useState(true)
  const COMMENTS_ID = 'disqus_thread'

  function LoadComments() {
    setEnabledLoadComments(false)

    // Show disqus-frame
    const disqusFrame = document.querySelector('.disqus-frame')
    if (disqusFrame) (disqusFrame as HTMLElement).style.display = 'block'

    window.disqus_config = function (this: DisqusConfig) {
      this.page.url = window.location.href
      this.page.identifier = frontMatter.slug
    }
    if (window.DISQUS === undefined) {
      var d = document,
        s = d.createElement('script')
      s.async = true
      s.src = `https://${siteMetadata.comment.disqusConfig.shortname}.disqus.com/embed.js`
      s.setAttribute('data-timestamp', String(+new Date()))
      s.onerror = function () {
        const disqusFrame = document.querySelector('.disqus-frame')
        if (disqusFrame)
          (disqusFrame as HTMLElement).innerHTML =
            'Error on loading Disqus comments.<br/>Please try reloading or setting your DNS to <b>1.1.1.1</b> or <b>8.8.8.8</b>.<br/>(<b><a target="_blank" href="https://1.1.1.1/help">More information</a></b>)'
      }
      ;(d.head || d.body).appendChild(s)
    } else {
      window.DISQUS.reset({ reload: true })
    }
  }

  return (
    <div className="pb-6 text-center text-gray-700 pt-12">
      {enableLoadComments && (
        <button
          className="mb-2 mr-2 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-bold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
          onClick={LoadComments}
        >
          Load Comments
        </button>
      )}
      <div
        className="disqus-frame rounded bg-white p-4"
        style={{
          display: 'none',
        }}
        id={COMMENTS_ID}
      />
    </div>
  )
}

export default Disqus
