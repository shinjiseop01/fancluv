import type { NextApiRequest, NextApiResponse } from 'next'

const MOCK_SURVEYS: Record<string, any[]> = {
  '1': [
    {
      id: 's1',
      club_id: '1',
      title: '다주른 시울 감독 선택',
      description: '우리 팩의 다주른 시울 감독으로 누구를 원하신가요?',
      options: ['A 감독', 'B 감독', 'C 감독'],
      responses_count: 234,
      is_active: true,
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 's2',
      club_id: '1',
      title: '반과단 경기력 평가',
      description: '어제 경기에 대한 단서 의견',
      options: ['매우 좋았다', '동등했다', '매우 나쁘다'],
      responses_count: 156,
      is_active: true,
      created_at: new Date(Date.now() - 172800000).toISOString(),
    },
  ],
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const { clubId } = req.query

      if (!clubId) {
        return res.status(400).json({ error: 'Missing clubId' })
      }

      // Try to use real Supabase if available
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        const { getSurveys } = await import('@/lib/supabase')
        const surveys = await getSurveys(clubId as string)
        return res.status(200).json(surveys)
      }

      // Mock response
      const surveys = MOCK_SURVEYS[clubId as string] || []
      return res.status(200).json(surveys)
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error: any) {
    console.error('Surveys API error:', error)
    // Fallback to mock on error
    const { clubId } = req.query
    const surveys = MOCK_SURVEYS[clubId as string] || []
    return res.status(200).json(surveys)
  }
}
