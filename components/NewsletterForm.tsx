'use client'

import { useRef, useState, FormEvent } from 'react'

interface NewsletterFormProps {
  title?: string
}

const NewsletterForm = ({
  title = 'Subscribe to our weekly updates about AI world!',
}: NewsletterFormProps) => {
  const inputEl = useRef<HTMLInputElement>(null)
  const nameInputEl = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [subscribed, setSubscribed] = useState<boolean>(false)

  const subscribe = async (e: FormEvent) => {
    e.preventDefault()

    if (!inputEl.current || !nameInputEl.current) return

    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        email: inputEl.current.value,
        name: nameInputEl.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { error } = await res.json()
    if (error) {
      setError(true)
      setMessage('Your e-mail address is invalid or you are already subscribed!')
      return
    }

    inputEl.current.value = ''
    setError(false)
    setSubscribed(true)
    setMessage('Successfully! 🎉 You are now subscribed.')
  }

  return (
    <div className="w-full">
      <div className="text-md pb-1 pt-1 text-gray-800">{title}</div>
      <form className="flex flex-col md:flex-row" onSubmit={subscribe}>
        <div>
          <label className="sr-only" htmlFor="name-input">
            Your name
          </label>
          <input
            autoComplete="name"
            className="mr-2 mt-1 w-full rounded-xl px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 md:w-40"
            id="name-input"
            name="name"
            placeholder="Your name"
            required
            type="text"
            ref={nameInputEl}
          />
        </div>
        <div>
          <label className="sr-only" htmlFor="email-input">
            Email address
          </label>
          <input
            autoComplete="email"
            className="mt-1 w-full rounded-xl px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 md:w-72"
            id="email-input"
            name="email"
            placeholder={subscribed ? "You're subscribed !  🎉" : 'Your email'}
            ref={inputEl}
            required
            type="email"
            disabled={subscribed}
          />
        </div>
        <div className="mt-2 flex w-full rounded-xl shadow-sm md:ml-3 md:mt-1">
          <button
            className={`w-full rounded-xl border border-primary-500 bg-primary-600 px-4 py-2 font-medium text-white ${
              subscribed ? 'cursor-default' : 'hover:bg-primary-600'
            } focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2`}
            type="submit"
            disabled={subscribed}
          >
            {subscribed ? 'Thank you!' : 'Sign up'}
          </button>
        </div>
      </form>
      {error && <div className="w-72 pt-2 text-sm text-red-500 sm:w-96">{message}</div>}
      {subscribed && <div className="w-72 pt-2 text-sm text-green-500 sm:w-96">{message}</div>}
    </div>
  )
}

export default NewsletterForm

interface BlogNewsletterFormProps {
  title: string
}

export const BlogNewsletterForm = ({ title }: BlogNewsletterFormProps) => (
  <div className="w-full">
    <div className="bg-gray-100 p-6 sm:px-14 sm:py-8">
      <NewsletterForm title={title} />
    </div>
  </div>
)
