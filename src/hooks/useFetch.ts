import { useEffect, useState } from 'react'

interface Post {
  userId?: number
  id: number
  title: string
  body?: string
}

type QueryParams = Record<string, number | string | boolean>

interface UseFetchResult {
  data: Post[]
  isLoading: boolean
  error: string
  refetch: (args: { params: QueryParams }) => void
}

export function useFetch(url: string): UseFetchResult {
  const [link, setLink] = useState(url)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<Post[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    setLink(url)
  }, [url])

  useEffect(() => {
    setIsLoading(true)

    fetch(link)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка. Статус: ${response.status}`)
        }
        return response.json() as Promise<Post[]>
      })
      .then(setData)
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => setIsLoading(false))
  }, [link])

  function refetch({ params }: { params: QueryParams }): void {
    const tempUrl = new URL(link)
    Object.entries(params).forEach(([key, value]) => tempUrl.searchParams.set(key, String(value)))
    setLink(tempUrl.toString())
  }

  return {
    data,
    isLoading,
    error,
    refetch,
  }
}
