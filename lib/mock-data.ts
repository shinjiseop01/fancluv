import { Club, Opinion, Survey, User } from '@/types'

export const MOCK_CLUBS: Club[] = [
  {
    id: '1',
    name: 'FC 서울',
    city: '서울',
    logo_url: '🔴',
    fans_count: 66704,
  },
  {
    id: '2',
    name: '대전 하나 시티즌',
    city: '대전',
    logo_url: '🔵',
    fans_count: 45000,
  },
  {
    id: '3',
    name: '전북 현대 모터스',
    city: '전주',
    logo_url: '🟢',
    fans_count: 52000,
  },
  {
    id: '4',
    name: '울산 현대',
    city: '울산',
    logo_url: '🟠',
    fans_count: 48000,
  },
  {
    id: '5',
    name: '수원 삼성',
    city: '수원',
    logo_url: '🔷',
    fans_count: 55000,
  },
  {
    id: '6',
    name: '포항 스틸러스',
    city: '포항',
    logo_url: '⚫',
    fans_count: 42000,
  },
  {
    id: '7',
    name: '인천 유나이티드',
    city: '인천',
    logo_url: '🟡',
    fans_count: 38000,
  },
  {
    id: '8',
    name: '성남 FC',
    city: '성남',
    logo_url: '🟣',
    fans_count: 35000,
  },
  {
    id: '9',
    name: '대구 FC',
    city: '대구',
    logo_url: '🔴',
    fans_count: 40000,
  },
  {
    id: '10',
    name: '광주 FC',
    city: '광주',
    logo_url: '🟢',
    fans_count: 32000,
  },
  {
    id: '11',
    name: '강원 FC',
    city: '춘천',
    logo_url: '🔵',
    fans_count: 28000,
  },
  {
    id: '12',
    name: '제주 유나이티드',
    city: '제주',
    logo_url: '🟠',
    fans_count: 25000,
  },
]

export const MOCK_OPINIONS: Opinion[] = [
  {
    id: '1',
    user_id: '1',
    club_id: '1',
    category: 'game_review',
    content: '오늘 경기는 정말 좋았어요! 팀의 수비가 정말 단단했습니다.',
    rating: 5,
    likes_count: 12,
    comments_count: 3,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    user: {
      nickname: '서울팬1',
    },
  },
  {
    id: '2',
    user_id: '2',
    club_id: '1',
    category: 'club_operation',
    content: '팬 서비스 개선이 필요합니다. 경기장 편의시설이 부족합니다.',
    rating: 3,
    likes_count: 8,
    comments_count: 2,
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    user: {
      nickname: '서울팬2',
    },
  },
  {
    id: '3',
    user_id: '3',
    club_id: '1',
    category: 'stadium_facility',
    content: '경기장 화장실이 너무 더럽습니다. 청소 빈도를 늘려주세요.',
    rating: 2,
    likes_count: 5,
    comments_count: 1,
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    user: {
      nickname: '서울팬3',
    },
  },
]

export const MOCK_SURVEYS: Survey[] = [
  {
    id: '1',
    club_id: '1',
    title: '좋아하는 선수는?',
    description: 'FC 서울에서 가장 좋아하는 선수를 선택해 주세요.',
    questions: [
      {
        id: '1',
        question_text: '좋아하는 선수는?',
        question_type: 'single_choice',
        options: ['선수1', '선수2', '선수3', '선수4'],
      },
    ],
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export const MOCK_USER: User = {
  id: '1',
  email: 'user@example.com',
  nickname: '서울팬1',
  team_id: '1',
  created_at: new Date().toISOString(),
}
