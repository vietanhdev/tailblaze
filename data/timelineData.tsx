import { Fragment } from 'react'
import { TimelineItem } from '@/types/timeline'

// Free nature stock images from Unsplash
const forestImage = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=500'
const mountainImage = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=500'
const beachImage = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=500'
const waterfallImage = 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=500'

const timelineData: TimelineItem[] = [
  {
    year: 'March 2023 - Present',
    position: 'left',
    company: 'TechInnovate Solutions',
    content: (
      <Fragment>
        <div className="flex flex-row mb-2">
          Working as a Senior Software Engineer at TechInnovate Solutions, leading the development
          of cutting-edge applications that transform how businesses operate in the digital space.
        </div>
        <ul>
          <li>
            <b>Sept 2023 - Present</b>: Lead Developer, AI Integration Team.
          </li>
          <li>
            <b>March 2023 - Sept 2023</b>: Senior Software Engineer.
          </li>
        </ul>
      </Fragment>
    ),
  },
  {
    year: 'June 2020 - Feb 2023',
    position: 'left',
    company: 'Global Systems Inc.',
    content: (
      <Fragment>
        <ul>
          <li>
            Led the development of a microservices architecture that improved system scalability by{' '}
            <b>250%</b> and reduced deployment times by <b>40%</b>.
          </li>
          <li>
            Designed and implemented RESTful APIs connecting <b>15 different services</b> with a
            unified interface.
          </li>
          <li>
            <b>Awarded: </b>Tech Division <b>"Innovation Award 2022"</b> for creating an automated
            CI/CD pipeline.
          </li>
          <li>
            <b>Recognized: </b>As <b>"Employee of the Quarter - Q3 2021"</b> for leading a critical
            project delivery ahead of schedule.
          </li>
        </ul>
      </Fragment>
    ),
    image: forestImage,
    imageAlt: 'Dense green forest with sunlight filtering through trees',
  },
  {
    year: 'April 2018 - May 2020',
    position: 'right',
    company: 'DataSphere Analytics',
    content: (
      <Fragment>
        <ul>
          <li>
            Worked as a <b>Data Scientist</b> on the company's flagship product, developing
            predictive models that increased customer retention by <b>35%</b>.
          </li>
          <li>
            Built and deployed a recommendation engine that boosted user engagement by <b>48%</b>{' '}
            and was featured in the{' '}
            <b>
              <a href="https://example.com/tech-news" target="_blank" rel="noreferrer">
                industry press
              </a>
            </b>
            .
          </li>
          <li>
            <b>Jan 2019 - May 2020:</b> Led a team of 4 engineers in the development of a real-time
            analytics dashboard using React and D3.js.
          </li>
        </ul>
      </Fragment>
    ),
    image: mountainImage,
    imageAlt: 'Majestic mountain peaks at sunset',
  },
  {
    year: 'Sept 2017 - April 2018',
    position: 'left',
    company: 'WebTech Solutions',
    content: (
      <Fragment>
        <ul>
          <li>
            Developed responsive web applications using React and Node.js for enterprise clients.
          </li>
          <li>
            Implemented continuous integration workflows that reduced bugs in production by{' '}
            <b>65%</b>.
          </li>
        </ul>
      </Fragment>
    ),
  },
  {
    year: '2014 - 2018',
    position: 'right',
    title: 'Education',
    content: (
      <Fragment>
        <p>
          Graduated from{' '}
          <b>
            <a
              href="https://example.edu"
              target="_blank"
              rel="noreferrer"
              aria-label="Example University"
            >
              Example University
            </a>
          </b>
          , with a Bachelor's degree in Computer Science. During my time there, I created several
          open-source projects and maintained a technical blog at{' '}
          <b>
            <a
              href="https://example.com/blog"
              target="_blank"
              rel="noreferrer"
              aria-label="Personal Tech Blog"
            >
              example.com/blog
            </a>
          </b>
          .
        </p>
        <ul>
          <li>
            Received the <b>Outstanding Project Award</b> for senior thesis on distributed systems
            and cloud computing.
          </li>
          <li>
            <b>First Place</b> - Annual Hackathon 2017.
          </li>
          <li>
            Served as a <b>Teaching Assistant</b> for Advanced Algorithms course.
          </li>
          <li>
            <b>Merit Scholarship</b> recipient for all four years of undergraduate study.
          </li>
        </ul>
      </Fragment>
    ),
    image: beachImage,
    imageAlt: 'Pristine beach with crystal clear waters',
  },
  {
    year: '2013',
    position: 'left',
    content: (
      <Fragment>
        <p>
          Created my first significant open-source project, a{' '}
          <b>
            <a
              href="https://example.com/project"
              target="_blank"
              rel="noreferrer"
              aria-label="File Management System"
            >
              file management system
            </a>
          </b>{' '}
          with over 500 GitHub stars. This project helped users organize and manage their digital
          assets more efficiently.
        </p>
      </Fragment>
    ),
    image: waterfallImage,
    imageAlt: 'Cascading waterfall in lush forest',
  },
  {
    year: '2010',
    position: 'right',
    content: (
      <Fragment>
        <p>
          <b>Started coding at age 14</b> on a secondhand laptop. Created my first application, a
          simple calculator, using Python. This early experience sparked my passion for software
          development and set me on the path to pursue computer science as a career.
        </p>
      </Fragment>
    ),
  },
]

export default timelineData
