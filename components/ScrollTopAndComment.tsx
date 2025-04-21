'use client'

import { useEffect, useState } from 'react'
import ScrollTop from '@/components/ScrollTop'

const ScrollTopAndComment = () => {
  const [, setShow] = useState<boolean>(false)

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 50) setShow(true)
      else setShow(false)
    }

    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  return (
    <>
      <ScrollTop />
    </>
  )
}

export default ScrollTopAndComment
