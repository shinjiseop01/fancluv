import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface Opinion {
  id: string
  title: string
  content: string
  category: string
  likes_count: number
  comments_count: number
  user: { nickname: string }
  created_at: string
}

interface Comment {
  id: string
  content: string
  user: { nickname: string }
  created_at: string
}

export const getServerSideProps = () => {
  return {
    props: {},
  }
}

export default function OpinionDetail() {
  const router = useRouter()
  const { id } = router.query
  const [opinion, setOpinion] = useState<Opinion | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/opinions/${id}`)
        if (!response.ok) throw new Error('의견 로드 실패')
        const data = await response.json()
        setOpinion(data.opinion)
        setComments(data.comments || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleLike = async () => {
    try {
      const userStr = localStorage.getItem('user')
      if (!userStr) throw new Error('사용자 정보 없음')

      const user = JSON.parse(userStr)

      const response = await fetch(`/api/opinions/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'like', userId: user.id }),
      })

      if (!response.ok) throw new Error('좋아요 실패')

      // Update opinion
      if (opinion) {
        setOpinion({ ...opinion, likes_count: opinion.likes_count + 1 })
      }
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return

    setSubmitting(true)
    try {
      const userStr = localStorage.getItem('user')
      if (!userStr) throw new Error('사용자 정보 없음')

      const user = JSON.parse(userStr)

      const response = await fetch(`/api/opinions/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'comment', userId: user.id, content: comment }),
      })

      if (!response.ok) throw new Error('댓글 작성 실패')

      const newComment = await response.json()
      setComments([...comments, newComment])
      setComment('')

      // Update comments count
      if (opinion) {
        setOpinion({ ...opinion, comments_count: opinion.comments_count + 1 })
      }
    } catch (err: any) {
      alert(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-20 md:pb-0">
        <p className="text-gray-600">로드 중...</p>
      </div>
    )
  }

  if (error || !opinion) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link href="/app">
            <Button variant="outline" className="mb-6">← 돌아가기</Button>
          </Link>
          <p className="text-red-600">{error || '의견을 찾을 수 없습니다.'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/app">
          <Button variant="outline" className="mb-6">← 돌아가기</Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{opinion.title || opinion.content.substring(0, 50)}</CardTitle>
                <p className="text-sm text-gray-600">{opinion.user?.nickname} • {new Date(opinion.created_at).toLocaleDateString()}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{opinion.content}</p>
                <div className="flex gap-4 text-sm mb-4">
                  <button onClick={handleLike} className="flex items-center gap-1 hover:text-red-500">
                    ❤️ {opinion.likes_count}
                  </button>
                  <span>💬 {opinion.comments_count}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>댓글</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-6">
                  <Input 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} 
                    placeholder="댓글 작성"
                    disabled={submitting}
                  />
                  <Button disabled={submitting || !comment.trim()}>
                    {submitting ? '작성 중...' : '등록'}
                  </Button>
                </form>

                <div className="space-y-4">
                  {comments.length === 0 ? (
                    <p className="text-gray-600 text-center py-4">아직 댓글이 없습니다.</p>
                  ) : (
                    comments.map((c) => (
                      <div key={c.id} className="border-l-2 border-gray-200 pl-4">
                        <p className="text-sm font-medium">{c.user?.nickname}</p>
                        <p className="text-gray-700">{c.content}</p>
                        <p className="text-xs text-gray-500">{new Date(c.created_at).toLocaleDateString()}</p>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>카테고리</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center font-semibold">{opinion.category}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
