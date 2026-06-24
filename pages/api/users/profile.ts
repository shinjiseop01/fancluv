import type { NextApiRequest, NextApiResponse } from 'next'

const MOCK_PROFILES: Record<string, any> = {}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query

    if (!userId) {
      return res.status(400).json({ error: 'Missing userId' })
    }

    if (req.method === 'GET') {
      // Try to use real Supabase if available
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        const { getUserProfile } = await import('@/lib/supabase')
        const profile = await getUserProfile(userId as string)
        return res.status(200).json(profile)
      }

      // Mock response
      const profile = MOCK_PROFILES[userId as string] || {
        id: userId,
        email: `user_${userId}@example.com`,
        nickname: `user_${userId}`,
        favorite_club_id: '1',
        created_at: new Date().toISOString(),
      }
      return res.status(200).json(profile)
    }

    if (req.method === 'PUT') {
      const { clubId } = req.body

      if (!clubId) {
        return res.status(400).json({ error: 'Missing clubId' })
      }

      // Try to use real Supabase if available
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        const { updateUserClub } = await import('@/lib/supabase')
        const updatedProfile = await updateUserClub(userId as string, clubId)
        return res.status(200).json(updatedProfile)
      }

      // Mock response
      const mockProfile = {
        id: userId,
        email: `user_${userId}@example.com`,
        nickname: `user_${userId}`,
        favorite_club_id: clubId,
        created_at: new Date().toISOString(),
      }
      MOCK_PROFILES[userId as string] = mockProfile
      return res.status(200).json(mockProfile)
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error: any) {
    console.error('User profile API error:', error)
    return res.status(400).json({ error: error.message })
  }
}
