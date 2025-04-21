export interface Repository {
  name: string
  url: string
  description: string
  stars: number
  forks: number
  language: string
  lastUpdated: string
}

export interface ContributionDay {
  contributionCount: number
  date: string
  color: string
}

export interface ContributionWeek {
  contributionDays: ContributionDay[]
}

export interface ContributionCalendar {
  totalContributions: number
  weeks: ContributionWeek[]
}

export interface CodingActivity {
  last7Days: number
  last30Days: number
  last90Days: number
  lastYear: number
}

export interface Commit {
  title: string
  url: string
  date: string
}

export interface CodingStats {
  repoCount: number
  commitCount: number
  starCount: number
  forkCount: number
  languages: Record<string, number>
  activity: CodingActivity
  contributionCalendar: ContributionCalendar
  topRepositories: Repository[]
  recentCommits: Commit[]
}
