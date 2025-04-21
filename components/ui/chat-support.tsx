'use client'

import { useState, useEffect } from 'react'
import { Button } from './button'
import { MessageCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from './dialog'

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Only render on client side to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Don't render anything during SSR
  if (!isMounted) return null

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg bg-white hover:bg-gray-100"
          aria-label="Open chat support"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col space-y-4 p-4">
          <h2 className="text-xl font-bold">Chat Support</h2>
          <p className="text-gray-600">
            Need help? You can reach me through any of the contact methods listed on the contact
            page.
          </p>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ChatSupport
