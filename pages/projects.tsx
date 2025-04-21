import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import Image from 'next-image-export-optimizer'
import Link from 'next/link'
import { FaGlobe, FaCode, FaPlay } from 'react-icons/fa'
import React from 'react'
import projectsData from '@/data/projectsData'
import { Project } from '@/types/project'

export default function Projects(): React.ReactNode {
  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Showcase of my works on machine learning and software engineering.
          </p>
        </div>
        <div className="container py-5">
          <div className="-m-4 flex flex-wrap">
            {projectsData.map((d, index) => (
              <div key={index} className="w-full p-4 md:w-1/2 lg:w-1/3">
                <div className="h-full">
                  <div
                    className="overflow-hidden rounded-md border-none bg-white pb-0 dark:bg-gray-700"
                    key={index}
                  >
                    <Link href={d.href} passHref>
                      <div className="cursor-pointer">
                        <Image
                          alt={d.title}
                          src={d.imgSrc}
                          className="object-cover object-center md:h-36 lg:h-48"
                          width={800}
                          height={500}
                        />
                      </div>
                    </Link>
                    <div className="p-4">
                      <Link href={d.href} passHref>
                        <h2 className="mb-3 cursor-pointer text-xl font-bold leading-8 tracking-tight hover:underline hover:underline-offset-2">
                          {d.title}
                        </h2>
                      </Link>
                      <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">
                        {d.description}
                      </p>
                      {/* Tech Stack Badges */}
                      {d.techstack && (
                        <div className="mt-2 mb-3 flex flex-wrap">
                          {d.techstack.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="mr-2 mb-2 rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-600 dark:text-gray-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex flex-row justify-start space-x-3">
                        {d.website && (
                          <Link href={d.website} passHref target="_blank">
                            <div className="flex cursor-pointer items-center text-gray-800 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-600">
                              <FaGlobe className="mr-1" />
                              <span className="font-medium">Website</span>
                            </div>
                          </Link>
                        )}
                        {d.github && (
                          <Link href={d.github} passHref target="_blank">
                            <div className="flex cursor-pointer items-center text-gray-800 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-600">
                              <FaCode className="mr-1" />
                              <span className="font-medium">GitHub</span>
                            </div>
                          </Link>
                        )}
                        {d.demo && (
                          <Link href={d.demo} passHref target="_blank">
                            <div className="flex cursor-pointer items-center text-gray-800 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-600">
                              <FaPlay className="mr-1" />
                              <span className="font-medium">Demo</span>
                            </div>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
