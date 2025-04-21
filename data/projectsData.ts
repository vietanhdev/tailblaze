import { Project } from '@/types/project'

const projectsData: Project[] = [
  {
    title: 'Tailblaze',
    description: `A modern, feature-rich blog theme built with Next.js and Tailwind CSS. This theme provides a powerful yet easy-to-use platform for bloggers, developers, and content creators.`,
    imgSrc: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    href: 'https://github.com/yourusername/tailblaze',
    github: 'https://github.com/yourusername/tailblaze',
    techstack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MDX'],
  },
  {
    title: 'Portfolio Website',
    description: `A sleek, responsive portfolio template built with React and styled with Tailwind CSS. Perfect for showcasing your work, skills, and experience.`,
    imgSrc: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    href: 'https://github.com/yourusername/portfolio',
    github: 'https://github.com/yourusername/portfolio',
    techstack: ['React', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Weather App',
    description: `A beautiful weather application that provides current conditions and forecasts. Built with React and using the OpenWeather API.`,
    imgSrc: 'https://images.unsplash.com/photo-1592210454359-9043f067919b',
    href: 'https://github.com/yourusername/weather-app',
    github: 'https://github.com/yourusername/weather-app',
    techstack: ['React', 'Context API', 'OpenWeather API'],
  },
  {
    title: 'Task Manager',
    description: `A full-stack task management application with user authentication, task creation, editing, and organization features.`,
    imgSrc: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b',
    href: 'https://github.com/yourusername/task-manager',
    github: 'https://github.com/yourusername/task-manager',
    techstack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
  },
  {
    title: 'Recipe Finder',
    description: `An application for finding and saving recipes based on available ingredients, dietary restrictions, and cuisine preferences.`,
    imgSrc: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f',
    href: 'https://github.com/yourusername/recipe-finder',
    github: 'https://github.com/yourusername/recipe-finder',
    techstack: ['React', 'Redux', 'Spoonacular API'],
  },
  {
    title: 'E-commerce Theme',
    description: `A complete e-commerce theme built with Next.js, featuring product listings, cart functionality, checkout process, and admin dashboard.`,
    imgSrc: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc',
    href: 'https://github.com/yourusername/ecommerce-theme',
    github: 'https://github.com/yourusername/ecommerce-theme',
    techstack: ['Next.js', 'TypeScript', 'Stripe', 'MongoDB'],
  },
]

export default projectsData
