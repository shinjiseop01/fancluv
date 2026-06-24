import type { NextApiRequest, NextApiResponse } from 'next'

const MOCK_SURVEYS: Record<string, any> = {
  's1': {
    id: 's1',
    club_id: '1',
    title: '다주른 시울 감독 선택',
    description: '우리 팩의 다주른 시울 감독으로 누구를 원하신가요?',
    options: ['A 감독', 'B 감독', 'C 감독'],
    responses_count: 234,
    is_active: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query

    if (!id) {
      return res.status(400).json({ error: 'Missing survey id' })
    }

    if (req.method === 'GET') {
      // Try to use real Supabase if available
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        const { getSurveyById } = await import('@/lib/supabase')
        const survey = await getSurveyById(id as string)
        return res.status(200).json(survey)
      }

      // Mock response
      const survey = MOCK_SURVEYS[id as string]
      return res.status(200).json(survey)
    }

    if (req.method === 'POST') {
      const { userId, selectedOption } = req.body

      if (!userId || !selectedOption) {
        return res.status(400).json({ error: 'Missing required fields' })
      }

      // Try to use real Supabase if available
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        const { submitSurveyResponse } = await import('@/lib/supabase')
        const response = await submitSurveyResponse(id as string, userId, selectedOption)
        return res.status(201).json(response)
      }

      // Mock response
      const mockResponse = {
        id: `sr_${Date.now()}`,
        survey_id: id,
        user_id: userId,
        selected_option: selectedOption,
        created_at: new Date().toISOString(),
      }

      if (MOCK_SURVEYS[id as string]) {
        MOCK_SURVEYS[id as string].responses_count += 1
      }

      return res.status(201).json(mockResponse)
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error: any) {
    console.error('Survey detail API error:', error)
    return res.status(400).json({ error: error.message })
  }
}
