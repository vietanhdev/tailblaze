import Image from 'next-image-export-optimizer'
import { PageSEO } from '@/components/SEO'
import Link from 'next/link'
import styles from '../css/about.module.scss'
import React from 'react'
import aboutMeData from '@/data/aboutMeData'
import timelineData from '@/data/timelineData'

interface FrontMatter {
  name: string
  occupation: string
  company: string
  [key: string]: any
}

interface AuthorLayoutProps {
  frontMatter: FrontMatter
  children?: React.ReactNode
}

export default function AuthorLayout({ frontMatter }: AuthorLayoutProps) {
  const { name, occupation, company } = frontMatter

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`A little trivia me`} />
      <div className="">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl mt-4 sm:leading-10 md:text-5xl text-center">
            About me
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8 xl:sticky xl:top-0">
            <Image
              src={aboutMeData.avatar}
              alt="avatar"
              width={208}
              height={208}
              className="mt-0 h-24 w-24 md:h-52 md:w-52"
              placeholder="blur"
              blurDataURL="/images/SVG-placeholder.png"
            />
            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="text-gray-500">{occupation}</div>
            <div className="text-gray-500">{company}</div>
          </div>
          <div className="prose max-w-none pb-8 pt-8 xl:col-span-2">
            <p>{aboutMeData.bio}</p>
            <ul dir="auto">
              <li>
                <strong>Skills:</strong> {aboutMeData.skills.join(', ')}.
              </li>
              <li>
                <strong>Founder of</strong>{' '}
                <a href={aboutMeData.founderLink} rel="noreferrer" target="_blank">
                  {aboutMeData.founder}
                </a>
                .
              </li>
              <li>
                <strong>LinkedIn:</strong>{' '}
                <a href={aboutMeData.linkedinLink} rel="noreferrer" target="_blank">
                  {aboutMeData.linkedin}
                </a>
                .
              </li>
              <li>
                <b>Side Projects:</b>{' '}
                <Link href="/projects" aria-label="Projects">
                  {aboutMeData.sideProjects}
                </Link>
              </li>
            </ul>
            <p>
              For a full and updated résumé, please see my{' '}
              <Link href={aboutMeData.linkedinLink} aria-label="LinkedIn">
                LinkedIn page
              </Link>
              . If you have any question, feel free to send me a message using{' '}
              <Link href="/contact" aria-label="Contact">
                this contact form
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="mt-1 md:pl-16">
          <div className="space-y-2 pb-1 pt-8 md:space-y-5">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-6xl">
              Timeline
            </h1>
          </div>
          <div className="max-w-none pb-8 pt-0 xl:col-span-2">
            <div className={styles.timeline}>
              {timelineData.map((item, index) => (
                <div key={index} className={`${item.position} ${styles.container}`}>
                  <div className={styles.content}>
                    <h2 className={item.title ? 'font-title' : ''}>{item.year}</h2>
                    {item.company && (
                      <h3 className="mb-2">
                        <b>{item.company}</b>
                      </h3>
                    )}
                    {item.title && (
                      <h3 className="mb-2">
                        <b>{item.title}</b>
                      </h3>
                    )}
                    {item.image && (
                      <Image
                        alt={item.imageAlt || ''}
                        src={item.image}
                        width={item.position === 'left' ? 256 : 384}
                        height={item.position === 'left' ? 256 : 216}
                        placeholder="blur"
                        className="md:m-8 my-2 rounded-lg"
                        blurDataURL="/images/SVG-placeholder.png"
                      />
                    )}
                    {item.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
