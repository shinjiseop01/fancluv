import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, password, nickname } = req.body

    if (!email || !password || !nickname) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Try to use real Supabase if available
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { signUp } = await import('@/lib/supabase')
      const data = await signUp(email, password, nickname)
      return res.status(200).json(data)
    }

    // Mock response for development
    const mockUser = {
      id: `user_${Date.now()}`,
      email,
      nickname,
      user_metadata: { nickname },
    }

    return res.status(200).json({
      user: mockUser,
      session: {
        access_token: `token_${Date.now()}`,
        user: mockUser,
      },
    })
  } catch (error: any) {
    console.error('Signup error:', error)
    return res.status(400).json({ error: error.message })
  }
}
