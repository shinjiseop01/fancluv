import type { NextApiRequest, NextApiResponse } from 'next'

const MOCK_CLUBS = [
  { id: '1', name: 'FC서울', nameEn: 'FC Seoul', logo_url: '⚽', city: '서울', cityEn: 'Seoul' },
  { id: '2', name: '울산HD', nameEn: 'Ulsan HD', logo_url: '⚽', city: '울산', cityEn: 'Ulsan' },
  { id: '3', name: '전북현대', nameEn: 'Jeonbuk Hyundai', logo_url: '⚽', city: '전주', cityEn: 'Jeonju' },
  { id: '4', name: '강원FC', nameEn: 'Gangwon FC', logo_url: '⚽', city: '강원', cityEn: 'Gangwon' },
  { id: '5', name: '포항스틸러스', nameEn: 'Pohang Steelers', logo_url: '⚽', city: '포항', cityEn: 'Pohang' },
  { id: '6', name: '인천유나이티드', nameEn: 'Incheon United', logo_url: '⚽', city: '인천', cityEn: 'Incheon' },
  { id: '7', name: 'FC안양', nameEn: 'FC Anyang', logo_url: '⚽', city: '안양', cityEn: 'Anyang' },
  { id: '8', name: '제주유나이티드', nameEn: 'Jeju United', logo_url: '⚽', city: '제주', cityEn: 'Jeju' },
  { id: '9', name: '부천FC1995', nameEn: 'Bucheon FC 1995', logo_url: '⚽', city: '부천', cityEn: 'Bucheon' },
  { id: '10', name: '대전하나시티즌', nameEn: 'Daejeon Hana Citizen', logo_url: '⚽', city: '대전', cityEn: 'Daejeon' },
  { id: '11', name: '김천상무', nameEn: 'Gimcheon Sangmu', logo_url: '⚽', city: '김천', cityEn: 'Gimcheon' },
  { id: '12', name: '광주FC', nameEn: 'Gwangju FC', logo_url: '⚽', city: '광주', cityEn: 'Gwangju' },
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      // Try to use real Supabase if available
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        const { getClubs } = await import('@/lib/supabase')
        const clubs = await getClubs()
        return res.status(200).json(clubs)
      }

      // Mock response
      return res.status(200).json(MOCK_CLUBS)
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error: any) {
    console.error('Clubs API error:', error)
    // Fallback to mock on error
    return res.status(200).json(MOCK_CLUBS)
  }
}
