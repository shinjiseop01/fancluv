// User Types
export interface User {
  id: string
  email: string
  nickname: string
  team_id: string
  created_at: string
}

// Club Types
export interface Club {
  id: string
  name: string
  city: string
  logo_url: string
  fans_count: number
}

// Opinion Types
export type OpinionCategory = 'game_review' | 'club_operation' | 'fan_community' | 'stadium_facility' | 'other'

export interface Opinion {
  id: string
  user_id: string
  club_id: string
  category: OpinionCategory
  content: string
  rating: number // 1-5
  image_url?: string
  likes_count: number
  comments_count: number
  created_at: string
  user?: {
    nickname: string
    avatar_url?: string
  }
}

// Comment Types
export interface Comment {
  id: string
  opinion_id: string
  user_id: string
  content: string
  created_at: string
  user?: {
    nickname: string
    avatar_url?: string
  }
}

// Survey Types
export interface SurveyQuestion {
  id: string
  question_text: string
  question_type: 'single_choice' | 'multiple_choice' | 'text'
  options?: string[]
}

export interface Survey {
  id: string
  club_id: string
  title: string
  description: string
  questions: SurveyQuestion[]
  created_at: string
  expires_at: string
}

export interface SurveyResponse {
  id: string
  survey_id: string
  user_id: string
  answers: Record<string, string | string[]>
  created_at: string
}

// Auth Types
export interface AuthSession {
  user: User | null
  isLoading: boolean
  isError: boolean
}
