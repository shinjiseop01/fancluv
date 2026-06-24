import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Try to use real Supabase if available
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { signIn } = await import('@/lib/supabase')
      const data = await signIn(email, password)
      return res.status(200).json(data)
    }

    // Mock response for development
    const mockUser = {
      id: `user_${email.split('@')[0]}`,
      email,
      nickname: email.split('@')[0],
    }

    return res.status(200).json({
      user: mockUser,
      session: {
        access_token: `token_${Date.now()}`,
        user: mockUser,
      },
    })
  } catch (error: any) {
    console.error('Signin error:', error)
    return res.status(400).json({ error: error.message })
  }
}
