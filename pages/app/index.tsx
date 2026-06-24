import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const getServerSideProps = () => {
  return {
    props: {},
  }
}

export default function AppIndex() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard
    router.replace('/app/dashboard')
  }, [router])

  return null
}
