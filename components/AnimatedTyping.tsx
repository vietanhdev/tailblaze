'use client'

import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

interface AnimatedTypingProps {
  strings: string[]
  className?: string
}

export default function AnimatedTyping({ strings, className }: AnimatedTypingProps) {
  const el = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!el.current) return

    const typed = new Typed(el.current, {
      strings,
      startDelay: 300,
      typeSpeed: 25,
      backSpeed: 10,
      backDelay: 1500,
      loop: true,
    })

    // Cleanup
    return () => {
      typed.destroy()
    }
  }, [strings])

  return <span ref={el} className={className}></span>
}
