import type { NextApiRequest, NextApiResponse } from 'next'

const MOCK_OPINIONS: Record<string, any> = {
  'op1': {
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
}

const MOCK_COMMENTS: Record<string, any[]> = {
  'op1': [
    {
      id: 'c1',
      opinion_id: 'op1',
      user_id: 'user2',
      content: '정말 좋은 의견입니다!',
      created_at: new Date(Date.now() - 1800000).toISOString(),
      user: { nickname: 'football_fan' },
    },
  ],
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query

    if (!id) {
      return res.status(400).json({ error: 'Missing opinion id' })
    }

    if (req.method === 'GET') {
      // Try to use real Supabase if available
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        const { getOpinionById, getComments } = await import('@/lib/supabase')
        const opinion = await getOpinionById(id as string)
        const comments = await getComments(id as string)
        return res.status(200).json({ opinion, comments })
      }

      // Mock response
      const opinion = MOCK_OPINIONS[id as string]
      const comments = MOCK_COMMENTS[id as string] || []
      return res.status(200).json({ opinion, comments })
    }

    if (req.method === 'POST') {
      const { action, userId, content } = req.body

      if (action === 'comment') {
        if (!userId || !content) {
          return res.status(400).json({ error: 'Missing required fields' })
        }

        // Try to use real Supabase if available
        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          const { createComment } = await import('@/lib/supabase')
          const comment = await createComment(id as string, userId, content)
          return res.status(201).json(comment)
        }

        // Mock response
        const mockComment = {
          id: `c_${Date.now()}`,
          opinion_id: id,
          user_id: userId,
          content,
          created_at: new Date().toISOString(),
          user: { nickname: 'user' },
        }

        if (!MOCK_COMMENTS[id as string]) {
          MOCK_COMMENTS[id as string] = []
        }
        MOCK_COMMENTS[id as string].push(mockComment)

        return res.status(201).json(mockComment)
      }

      if (action === 'like') {
        if (!userId) {
          return res.status(400).json({ error: 'Missing userId' })
        }

        // Try to use real Supabase if available
        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          const { toggleLike } = await import('@/lib/supabase')
          await toggleLike(id as string, userId)
          return res.status(200).json({ success: true })
        }

        // Mock response
        if (MOCK_OPINIONS[id as string]) {
          MOCK_OPINIONS[id as string].likes_count += 1
        }
        return res.status(200).json({ success: true })
      }

      if (action === 'hide') {
        // Try to use real Supabase if available
        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          const { hideOpinion } = await import('@/lib/supabase')
          await hideOpinion(id as string)
          return res.status(200).json({ success: true })
        }

        // Mock response
        if (MOCK_OPINIONS[id as string]) {
          MOCK_OPINIONS[id as string].is_hidden = true
        }
        return res.status(200).json({ success: true })
      }

      return res.status(400).json({ error: 'Invalid action' })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error: any) {
    console.error('Opinion detail API error:', error)
    return res.status(400).json({ error: error.message })
  }
}
