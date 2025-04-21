import { CareerEntry, Milestone, FAQ, PersonalInfo } from '@/types/personalInfo'

export const personalInfo: PersonalInfo = {
  name: 'John Doe',
  title: 'Full Stack Developer',
  description:
    'A passionate full stack developer with a knack for learning new technologies and building scalable applications. I specialize in web development, cloud architecture, and DevOps practices while maintaining a strong interest in emerging technologies.',
  skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'Python', 'MongoDB'],
  currentRole: 'Senior Developer at Tech Solutions Inc.',
  socialLinks: {
    linkedin: 'linkedin.com/in/johndoe',
  },
  contact:
    'For a full and updated résumé, please see my LinkedIn page. If you have any question, feel free to send me a message using this contact form.',
}

export const careerTimeline: CareerEntry[] = [
  {
    period: 'Jan 2024 - Present',
    company: 'Tech Solutions Inc.',
    description:
      'Leading the development of enterprise-scale web applications using modern technologies and best practices. Mentoring junior developers and architecting scalable solutions.',
    positions: [
      {
        title: 'Senior Full Stack Developer',
        period: 'Jan 2024 - Present',
      },
    ],
  },
  {
    period: 'Mar 2021 - Dec 2023',
    company: 'Digital Innovations Corp',
    description:
      'Developed and maintained multiple client-facing applications. Led the migration of legacy systems to modern cloud architecture. Implemented CI/CD pipelines and improved deployment processes.',
    achievements: [
      'Employee of the Year 2023',
      'Led successful migration of 5 major client applications to AWS',
    ],
  },
  {
    period: 'Jun 2019 - Feb 2021',
    company: 'StartUp Ventures',
    description:
      'Worked as a full stack developer in an agile team, building innovative solutions for startup clients. Implemented new features and optimized application performance.',
    positions: [
      {
        title: 'Full Stack Developer',
        period: 'Jun 2019 - Feb 2021',
        description: 'Built and maintained web applications using React, Node.js, and MongoDB.',
      },
    ],
  },
  {
    period: 'Jan 2018 - May 2019',
    company: 'CodeCraft Labs',
    description:
      'Started career as a junior developer working on various web development projects using JavaScript and PHP.',
  },
  {
    period: '2014-2018',
    company: 'Tech State University',
    description:
      "Earned Bachelor's degree in Computer Science with focus on software engineering and web technologies.",
    achievements: [
      'Graduated with Honors',
      'Best Senior Project Award',
      'President of Computer Science Club',
      'Won University Hackathon 2017',
      'Teaching Assistant for Web Development course',
    ],
  },
]

export const personalMilestones: Milestone[] = [
  {
    year: 2016,
    description:
      'Created first major open-source project - a React component library that gained over 1000 stars on GitHub.',
    project: 'ReactUI Library',
  },
  {
    year: 2013,
    description:
      'Wrote my first line of code in Python at age 16. Created a simple calculator application that sparked my interest in programming. Continued learning through online courses and personal projects.',
  },
]

// Common questions and answers about John Doe
export const faqData: FAQ[] = [
  {
    question: 'Who is John Doe?',
    answer:
      "John Doe is a full stack developer with expertise in web development, cloud architecture, and DevOps. He's currently working as a Senior Developer at Tech Solutions Inc.",
  },
  {
    question: "What are John's main skills?",
    answer:
      "John's core skills include React, Node.js, TypeScript, AWS, Docker, Python, and MongoDB.",
  },
  {
    question: 'Where has John worked?',
    answer:
      'John has worked at Tech Solutions Inc. (current), Digital Innovations Corp, StartUp Ventures, and CodeCraft Labs.',
  },
  {
    question: "What is John's educational background?",
    answer:
      "John graduated from Tech State University with a Bachelor's degree in Computer Science.",
  },
  {
    question: 'What achievements has John received?',
    answer:
      'John has received several awards including Employee of the Year 2023 at Digital Innovations Corp, Best Senior Project Award at university, and led successful migration projects at his current company.',
  },
  {
    question: 'When did John start programming?',
    answer:
      'John started programming at age 16 in 2013, when he created his first calculator application in Python.',
  },
  {
    question: 'What is Tech Solutions Inc.?',
    answer:
      'Tech Solutions Inc. is a leading technology company where John currently works as a Senior Developer.',
  },
  {
    question: 'How can I contact John?',
    answer:
      'You can connect with John on LinkedIn at linkedin.com/in/johndoe or use the contact form on his website.',
  },
]
