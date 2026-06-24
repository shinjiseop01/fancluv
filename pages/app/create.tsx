import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const getServerSideProps = () => {
  return {
    props: {},
  }
}

export default function CreateOpinion() {
  const router = useRouter()
  const [category, setCategory] = useState('경기 리뷰')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!title || !content) {
      setError('제목과 내용을 입력해주세요.')
      return
    }

    setLoading(true)
    try {
      const userStr = localStorage.getItem('user')
      if (!userStr) throw new Error('사용자 정보 없음')

      const user = JSON.parse(userStr)

      // Get user profile to find club
      const profileRes = await fetch(`/api/users/profile?userId=${user.id}`)
      if (!profileRes.ok) throw new Error('프로필 로드 실패')
      const profile = await profileRes.json()

      // Create opinion
      const response = await fetch('/api/opinions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          clubId: profile.favorite_club_id,
          category,
          title,
          content,
        }),
      })

      if (!response.ok) throw new Error('의견 작성 실패')

      router.push('/app')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">의견 작성</h1>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        <form className="space-y-6 bg-white p-8 rounded-lg" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-2">카테고리</label>
            <select 
              className="w-full px-4 py-2 border rounded-lg"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={loading}
            >
              <option>경기 리뷰</option>
              <option>구단 운영</option>
              <option>팬 커뮤니티</option>
              <option>경기장 시설</option>
              <option>기타</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">제목</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="의견의 제목을 입력하세요"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">내용</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="당신의 의견을 자유롭게 작성해주세요"
              rows={8}
              disabled={loading}
            />
          </div>

          <div className="flex gap-4">
            <Button className="flex-1" disabled={loading}>
              {loading ? '작성 중...' : '작성 완료'}
            </Button>
            <Link href="/app" className="flex-1">
              <Button variant="outline" className="w-full" disabled={loading}>
                취소
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
