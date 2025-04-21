import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import React from 'react'

const Contact = (): React.ReactNode => {
  return (
    <>
      <PageSEO title={`Contact - ${siteMetadata.author}`} description="All my contacts" />
      <div className="mx-auto max-w-3xl overflow-hidden">
        <section className="rounded-md bg-white">
          <div className="mx-auto max-w-screen-md px-4 py-8 lg:py-16">
            <h2 className="mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900">
              Send me a message
            </h2>
            <p className="mb-8 text-center font-light text-gray-500 sm:text-xl lg:mb-16">
              Using below contact form to send Viet Anh a message.
            </p>
            <form action="https://formspree.io/f/mnqyaezo" method="POST" className="space-y-8">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900">
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="John Doe"
                  required
                ></input>
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="name@example.com"
                  required
                ></input>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-900">
                  Your message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="Leave a comment..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="rounded-lg bg-primary-600 px-5 py-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 sm:w-fit"
              >
                Send message
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  )
}

export default Contact
