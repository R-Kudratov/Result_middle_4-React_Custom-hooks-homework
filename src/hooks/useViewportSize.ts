import { useEffect, useState } from 'react'

type WindowSize = { width: number; height: number }
type UseViewportSize = () => WindowSize

export const useViewportSize: UseViewportSize = () => {
  const isExists: boolean = typeof window !== 'undefined'

  const [windowSize, setWindowSize] = useState({
    width: isExists ? window.innerWidth : 0,
    height: isExists ? window.innerHeight : 0,
  })

  useEffect(() => {
    if (!isExists) return

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [isExists])

  return windowSize
}
