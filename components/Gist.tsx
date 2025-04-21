import React from 'react'

interface GistProps {
  id: string
}

const Gist = ({ id }: GistProps) => {
  // Extract username and gistId from the combined id
  const [username, gistId] = id.includes('/') ? id.split('/') : [id, '']

  // Create the iframe URL - using either the combined ID or split components
  const url = gistId
    ? `https://gist.github.com/${username}/${gistId}.pibb`
    : `https://gist.github.com/${username}.pibb`

  return (
    <div className="gist-embed my-4">
      <iframe
        src={url}
        frameBorder="0"
        scrolling="auto"
        className="w-full h-[500px]"
        title={`GitHub Gist by ${username}: ${gistId || ''}`}
      />
    </div>
  )
}

export default Gist
