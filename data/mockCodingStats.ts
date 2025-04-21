import { CodingStats } from '../types/coding-stats'

// Mock data for coding statistics
const mockCodingStats: CodingStats = {
  repoCount: 163,
  commitCount: 12023,
  starCount: 764,
  forkCount: 321,
  languages: {
    TypeScript: 35,
    Python: 28,
    JavaScript: 15,
    C: 10,
    'C++': 8,
    Other: 4,
  },
  activity: {
    last7Days: 32,
    last30Days: 142,
    last90Days: 431,
    lastYear: 1863,
  },
  contributionCalendar: {
    totalContributions: 2137,
    weeks: [
      {
        contributionDays: [
          { date: '2025-02-23', contributionCount: 2, color: '#9be9a8' },
          { date: '2025-02-24', contributionCount: 4, color: '#40c463' },
          { date: '2025-02-25', contributionCount: 2, color: '#9be9a8' },
          { date: '2025-02-26', contributionCount: 0, color: '#ebedf0' },
          { date: '2025-02-27', contributionCount: 1, color: '#9be9a8' },
          { date: '2025-02-28', contributionCount: 4, color: '#40c463' },
          { date: '2025-03-01', contributionCount: 4, color: '#40c463' },
        ],
      },
      {
        contributionDays: [
          { date: '2025-03-02', contributionCount: 8, color: '#30a14e' },
          { date: '2025-03-03', contributionCount: 6, color: '#30a14e' },
          { date: '2025-03-04', contributionCount: 7, color: '#30a14e' },
          { date: '2025-03-05', contributionCount: 7, color: '#30a14e' },
          { date: '2025-03-06', contributionCount: 9, color: '#30a14e' },
          { date: '2025-03-07', contributionCount: 14, color: '#216e39' },
          { date: '2025-03-08', contributionCount: 10, color: '#30a14e' },
        ],
      },
      {
        contributionDays: [
          { date: '2025-03-09', contributionCount: 4, color: '#40c463' },
          { date: '2025-03-10', contributionCount: 0, color: '#ebedf0' },
          { date: '2025-03-11', contributionCount: 0, color: '#ebedf0' },
          { date: '2025-03-12', contributionCount: 1, color: '#9be9a8' },
          { date: '2025-03-13', contributionCount: 1, color: '#9be9a8' },
          { date: '2025-03-14', contributionCount: 12, color: '#216e39' },
          { date: '2025-03-15', contributionCount: 14, color: '#216e39' },
        ],
      },
      {
        contributionDays: [
          { date: '2025-03-16', contributionCount: 0, color: '#ebedf0' },
          { date: '2025-03-17', contributionCount: 1, color: '#9be9a8' },
          { date: '2025-03-18', contributionCount: 3, color: '#40c463' },
          { date: '2025-03-19', contributionCount: 0, color: '#ebedf0' },
          { date: '2025-03-20', contributionCount: 0, color: '#ebedf0' },
          { date: '2025-03-21', contributionCount: 0, color: '#ebedf0' },
          { date: '2025-03-22', contributionCount: 0, color: '#ebedf0' },
        ],
      },
      {
        contributionDays: [
          { date: '2025-03-23', contributionCount: 0, color: '#ebedf0' },
          { date: '2025-03-24', contributionCount: 2, color: '#9be9a8' },
          { date: '2025-03-25', contributionCount: 1, color: '#9be9a8' },
          { date: '2025-03-26', contributionCount: 1, color: '#9be9a8' },
          { date: '2025-03-27', contributionCount: 0, color: '#ebedf0' },
          { date: '2025-03-28', contributionCount: 0, color: '#ebedf0' },
          { date: '2025-03-29', contributionCount: 0, color: '#ebedf0' },
        ],
      },
      {
        contributionDays: [
          { date: '2025-03-30', contributionCount: 0, color: '#ebedf0' },
          { date: '2025-03-31', contributionCount: 0, color: '#ebedf0' },
          { date: '2025-04-01', contributionCount: 0, color: '#ebedf0' },
          { date: '2025-04-02', contributionCount: 0, color: '#ebedf0' },
          { date: '2025-04-03', contributionCount: 0, color: '#ebedf0' },
          { date: '2025-04-04', contributionCount: 0, color: '#ebedf0' },
          { date: '2025-04-05', contributionCount: 0, color: '#ebedf0' },
        ],
      },
      {
        contributionDays: [
          { date: '2025-04-06', contributionCount: 0, color: '#ebedf0' },
          { date: '2025-04-07', contributionCount: 1, color: '#9be9a8' },
          { date: '2025-04-08', contributionCount: 0, color: '#ebedf0' },
          { date: '2025-04-09', contributionCount: 1, color: '#9be9a8' },
          { date: '2025-04-10', contributionCount: 4, color: '#40c463' },
          { date: '2025-04-11', contributionCount: 0, color: '#ebedf0' },
          { date: '2025-04-12', contributionCount: 0, color: '#ebedf0' },
        ],
      },
    ],
  },
  topRepositories: [
    {
      name: 'anylabeling',
      url: 'https://github.com/vietanhdev/anylabeling',
      description:
        'Effortless AI-assisted data labeling with AI support from YOLO, Segment Anything (SAM+SAM2), MobileSAM!!',
      stars: 2565,
      forks: 264,
      language: 'Python',
      lastUpdated: '2025-03-15T03:22:30Z',
    },
    {
      name: 'llama-assistant',
      url: 'https://github.com/nrl-ai/llama-assistant',
      description:
        'AI-powered assistant to help you with your daily tasks, powered by Llama 3, DeepSeek R1, and many more models on HuggingFace.',
      stars: 490,
      forks: 41,
      language: 'Python',
      lastUpdated: '2025-03-13T08:56:58Z',
    },
    {
      name: 'shipfast',
      url: 'https://github.com/vietanhdev/shipfast',
      description:
        'The best free SaaS base for GenAI, LLM, and other AI Services. Ship your next Generative AI startups in days.',
      stars: 467,
      forks: 118,
      language: 'TypeScript',
      lastUpdated: '2025-03-13T18:21:49Z',
    },
  ],
  recentCommits: [
    {
      title: 'Merge pull request #203 from vietanhdev/feat/data-export',
      url: 'https://github.com/vietanhdev/anylabeling/commit/ef59ccbb42cd29ff3ccddf1eb4d6ca6f26df737f',
      date: '2025-03-14T15:13:30Z',
    },
    {
      title: 'Support exporting to random names',
      url: 'https://github.com/vietanhdev/anylabeling/commit/363824ce3d9e171ce27c8f059a0d003bc07d4488',
      date: '2025-03-14T15:04:43Z',
    },
    {
      title: 'Add checkbox for recursively scanning',
      url: 'https://github.com/vietanhdev/anylabeling/commit/825383c9084f3baa903463d8bec7117dc0761015',
      date: '2025-03-14T14:50:42Z',
    },
  ],
}

export default mockCodingStats
