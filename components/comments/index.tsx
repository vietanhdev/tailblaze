'use client'

import siteMetadata from '@/data/siteMetadata'
import dynamic from 'next/dynamic'
import React from 'react'

interface FrontMatter {
  slug: string
  [key: string]: any
}

interface CommentsProps {
  frontMatter: FrontMatter
}

const UtterancesComponent = dynamic(() => import('@/components/comments/Utterances'), {
  ssr: false,
})

const DisqusComponent = dynamic(() => import('@/components/comments/Disqus'), { ssr: false })

const Comments = ({ frontMatter }: CommentsProps): React.ReactElement => {
  const comment = siteMetadata?.comment
  if (!comment || Object.keys(comment).length === 0) return <></>
  return (
    <div id="comment">
      {siteMetadata.comment && siteMetadata.comment.provider === 'utterances' && (
        <UtterancesComponent />
      )}
      {siteMetadata.comment && siteMetadata.comment.provider === 'disqus' && (
        <DisqusComponent frontMatter={frontMatter} />
      )}
    </div>
  )
}

export default Comments
