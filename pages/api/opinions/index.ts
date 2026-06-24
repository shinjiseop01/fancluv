import type { NextApiRequest, NextApiResponse } from 'next'

const MOCK_OPINIONS: Record<string, any[]> = {
  '1': [
    {
      id: 'op1',
      user_id: 'user1',
      club_id: '1',
      category: '선수',
      title: 'FC서울 다주른 시울 단계로 도남',
      content: '다주른 시울 단계로 도남했다. 다주 경기는 반드시 이기는 다.',
      likes_count: 42,
      comments_count: 8,
      is_hidden: false,
      created_at: new Date(Date.now() - 3600000).toISOString(),
      user: { nickname: 'fan_seoul' },
    },
    {
      id: 'op2',
      user_id: 'user2',
      club_id: '1',
      category: '경기',
      title: '어제 경기 분석',
      content: '어제 경기는 중반부에 너무 집중력을 잡아서 싱거른 경기를 했다.',
      likes_count: 28,
      comments_count: 5,
      is_hidden: false,
      created_at: new Date(Date.now() - 7200000).toISOString(),
      user: { nickname: 'football_fan' },
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
        const { getOpinions } = await import('@/lib/supabase')
        const opinions = await getOpinions(clubId as string)
        return res.status(200).json(opinions)
      }

      // Mock response
      const opinions = MOCK_OPINIONS[clubId as string] || []
      return res.status(200).json(opinions)
    }

    if (req.method === 'POST') {
      const { userId, clubId, category, title, content } = req.body

      if (!userId || !clubId || !category || !title || !content) {
        return res.status(400).json({ error: 'Missing required fields' })
      }

      // Try to use real Supabase if available
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        const { createOpinion } = await import('@/lib/supabase')
        const opinion = await createOpinion(userId, clubId, category, title, content)
        return res.status(201).json(opinion)
      }

      // Mock response
      const mockOpinion = {
        id: `op_${Date.now()}`,
        user_id: userId,
        club_id: clubId,
        category,
        title,
        content,
        likes_count: 0,
        comments_count: 0,
        is_hidden: false,
        created_at: new Date().toISOString(),
        user: { nickname: 'user' },
      }

      // Add to mock data
      if (!MOCK_OPINIONS[clubId]) {
        MOCK_OPINIONS[clubId] = []
      }
      MOCK_OPINIONS[clubId].unshift(mockOpinion)

      return res.status(201).json(mockOpinion)
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error: any) {
    console.error('Opinions API error:', error)
    return res.status(400).json({ error: error.message })
  }
}
