// Mock 데이터 구조

export interface Survey {
  id: string
  title: string
  description: string
  category: string
  status: 'active' | 'closed'
  createdAt: string
  endAt?: string
  options: {
    text: string
    votes: number
  }[]
  totalVotes: number
}

export interface Opinion {
  id: string
  author: string
  title: string
  content: string
  category: string
  likes: number
  comments: number
  createdAt: string
  teamId: string
}

export interface News {
  id: string
  title: string
  content: string
  category: 'notice' | 'schedule' | 'transfer' | 'event'
  image?: string
  createdAt: string
  teamId: string
}

export interface CommunityPost {
  id: string
  author: string
  title: string
  content: string
  category: 'free' | 'match' | 'stadium' | 'away'
  likes: number
  comments: number
  createdAt: string
  teamId: string
}

export interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  date: string
  time: string
  venue: string
  status: 'scheduled' | 'live' | 'finished'
  homeScore?: number
  awayScore?: number
}

export interface FanRanking {
  rank: number
  nickname: string
  points: number
  badges: string[]
  level: string
  teamId: string
}

export interface AIInsight {
  sentiment: {
    positive: number
    neutral: number
    negative: number
  }
  keywords: {
    word: string
    frequency: number
    sentiment: 'positive' | 'neutral' | 'negative'
  }[]
  satisfaction: number
  topicsOfInterest: string[]
}

// Mock 데이터 생성 함수
export const generateMockSurveys = (): Survey[] => [
  {
    id: '1',
    title: '2026 시즌 주전 공격수 선정',
    description: '2026 시즌 주전 공격수로 누가 가장 적합할까요?',
    category: 'team',
    status: 'active',
    createdAt: '2026-06-20',
    endAt: '2026-06-30',
    options: [
      { text: '선수 A', votes: 245 },
      { text: '선수 B', votes: 189 },
      { text: '선수 C', votes: 156 },
      { text: '선수 D', votes: 112 }
    ],
    totalVotes: 702
  },
  {
    id: '2',
    title: '다음 주 경기 예상 결과는?',
    description: '다음 주 경기 결과를 예측해주세요',
    category: 'match',
    status: 'active',
    createdAt: '2026-06-22',
    endAt: '2026-06-28',
    options: [
      { text: '우리 팀 승리', votes: 567 },
      { text: '무승부', votes: 234 },
      { text: '우리 팀 패배', votes: 145 }
    ],
    totalVotes: 946
  },
  {
    id: '3',
    title: '올 시즌 최고의 경기는?',
    description: '올 시즌 가장 인상적이었던 경기를 선택해주세요',
    category: 'match',
    status: 'closed',
    createdAt: '2026-06-01',
    endAt: '2026-06-15',
    options: [
      { text: '6월 5일 경기', votes: 456 },
      { text: '6월 12일 경기', votes: 389 },
      { text: '6월 19일 경기', votes: 278 }
    ],
    totalVotes: 1123
  }
]

export const generateMockOpinions = (): Opinion[] => [
  {
    id: '1',
    author: '축구광',
    title: '이번 경기 정말 아쉬웠어요',
    content: '좋은 기회를 놓쳤는데 아쉽습니다. 다음 경기에서 꼭 이기길 바랍니다.',
    category: 'match',
    likes: 234,
    comments: 45,
    createdAt: '2026-06-23',
    teamId: 'fc-seoul'
  },
  {
    id: '2',
    author: '팬심',
    title: '새 선수 영입에 대한 의견',
    content: '새로 영입한 선수가 정말 좋은 활약을 하고 있네요. 앞으로의 활약이 기대됩니다.',
    category: 'team',
    likes: 189,
    comments: 32,
    createdAt: '2026-06-22',
    teamId: 'fc-seoul'
  },
  {
    id: '3',
    author: '응원단',
    title: '경기장 분위기가 최고였어요',
    content: '어제 경기 응원 분위기가 정말 좋았습니다. 모두 함께 응원하는 모습이 정말 멋있었어요.',
    category: 'stadium',
    likes: 456,
    comments: 78,
    createdAt: '2026-06-21',
    teamId: 'fc-seoul'
  }
]

export const generateMockNews = (): News[] => [
  {
    id: '1',
    title: '2026 시즌 신입 선수 영입 발표',
    content: '우리 팀이 새로운 시즌을 위해 3명의 신입 선수를 영입했습니다.',
    category: 'notice',
    createdAt: '2026-06-23',
    teamId: 'fc-seoul'
  },
  {
    id: '2',
    title: '6월 28일 경기 일정 안내',
    content: '다음 경기는 6월 28일 오후 7시에 진행됩니다. 많은 응원 부탁드립니다.',
    category: 'schedule',
    createdAt: '2026-06-23',
    teamId: 'fc-seoul'
  },
  {
    id: '3',
    title: '주전 선수 이적 소식',
    content: '주전 선수가 해외 구단으로 이적하게 되었습니다. 그동안 수고해주셨습니다.',
    category: 'transfer',
    createdAt: '2026-06-22',
    teamId: 'fc-seoul'
  },
  {
    id: '4',
    title: '팬 감사 이벤트 개최',
    content: '팬 여러분을 감사하는 마음으로 특별한 이벤트를 개최합니다.',
    category: 'event',
    createdAt: '2026-06-21',
    teamId: 'fc-seoul'
  }
]

export const generateMockMatches = (): Match[] => [
  {
    id: '1',
    homeTeam: 'FC서울',
    awayTeam: '울산HD',
    date: '2026-06-28',
    time: '19:00',
    venue: '서울월드컵경기장',
    status: 'scheduled'
  },
  {
    id: '2',
    homeTeam: 'FC서울',
    awayTeam: '전북현대',
    date: '2026-07-05',
    time: '18:00',
    venue: '서울월드컵경기장',
    status: 'scheduled'
  },
  {
    id: '3',
    homeTeam: '강원FC',
    awayTeam: 'FC서울',
    date: '2026-07-12',
    time: '15:00',
    venue: '강릉종합운동장',
    status: 'scheduled'
  },
  {
    id: '4',
    homeTeam: 'FC서울',
    awayTeam: '포항스틸러스',
    date: '2026-06-21',
    time: '19:00',
    venue: '서울월드컵경기장',
    status: 'finished',
    homeScore: 2,
    awayScore: 1
  }
]

export const generateMockCommunityPosts = (): CommunityPost[] => [
  {
    id: '1',
    author: '자유로운마음',
    title: '오늘 날씨 좋네요',
    content: '오늘 날씨가 정말 좋습니다. 모두 즐거운 하루 되세요!',
    category: 'free',
    likes: 123,
    comments: 45,
    createdAt: '2026-06-23',
    teamId: 'fc-seoul'
  },
  {
    id: '2',
    author: '경기분석가',
    title: '어제 경기 분석',
    content: '어제 경기에서 우리 팀의 전술이 정말 좋았습니다. 특히 미드필더의 활약이 눈에 띄었어요.',
    category: 'match',
    likes: 234,
    comments: 67,
    createdAt: '2026-06-22',
    teamId: 'fc-seoul'
  },
  {
    id: '3',
    author: '직관러',
    title: '어제 직관 후기',
    content: '어제 경기장에서 직관했는데 정말 멋있었어요. 응원 분위기가 최고였습니다!',
    category: 'stadium',
    likes: 345,
    comments: 89,
    createdAt: '2026-06-21',
    teamId: 'fc-seoul'
  },
  {
    id: '4',
    author: '원정팬',
    title: '원정 후기 - 부산 원정',
    content: '부산 원정을 다녀왔습니다. 먼 거리였지만 정말 값진 경험이었어요.',
    category: 'away',
    likes: 156,
    comments: 34,
    createdAt: '2026-06-20',
    teamId: 'fc-seoul'
  }
]

export const generateMockFanRankings = (): FanRanking[] => [
  {
    rank: 1,
    nickname: '축구왕',
    points: 5420,
    badges: ['활동왕', '의견왕', '댓글왕'],
    level: '플래티넘',
    teamId: 'fc-seoul'
  },
  {
    rank: 2,
    nickname: '팬심',
    points: 4890,
    badges: ['활동왕', '의견왕'],
    level: '골드',
    teamId: 'fc-seoul'
  },
  {
    rank: 3,
    nickname: '응원단',
    points: 4560,
    badges: ['댓글왕'],
    level: '골드',
    teamId: 'fc-seoul'
  },
  {
    rank: 4,
    nickname: '자유로운마음',
    points: 4120,
    badges: ['신규가입'],
    level: '실버',
    teamId: 'fc-seoul'
  },
  {
    rank: 5,
    nickname: '경기분석가',
    points: 3890,
    badges: [],
    level: '실버',
    teamId: 'fc-seoul'
  }
]

export const generateMockAIInsights = (): AIInsight => ({
  sentiment: {
    positive: 65,
    neutral: 25,
    negative: 10
  },
  keywords: [
    { word: '경기', frequency: 234, sentiment: 'positive' },
    { word: '선수', frequency: 189, sentiment: 'positive' },
    { word: '응원', frequency: 156, sentiment: 'positive' },
    { word: '아쉬움', frequency: 89, sentiment: 'negative' },
    { word: '기대', frequency: 145, sentiment: 'positive' }
  ],
  satisfaction: 78,
  topicsOfInterest: ['경기 결과', '선수 영입', '경기장 분위기', '다음 경기 예상']
})
