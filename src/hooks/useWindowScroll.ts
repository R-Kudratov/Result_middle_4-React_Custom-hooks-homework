interface ScrollPosition {
  x: number
  y: number
}
type UpdateScrollPosition = Partial<ScrollPosition>

type UseWindowScroll = [scroll: ScrollPosition, scrollTo: (args: UpdateScrollPosition) => void]

import { useEffect, useState } from 'react'

export const useWindowScroll = (): UseWindowScroll => {
  const isExists = typeof window !== 'undefined'

  const [scroll, setScroll] = useState<ScrollPosition>(() => ({
    x: isExists ? window.scrollX : 0,
    y: isExists ? window.scrollY : 0,
  }))

  const handleScrollChange = () => {
    const newXValue = Math.round(window.scrollX)
    const newYValue = Math.round(window.scrollY)
    setScroll({ x: newXValue, y: newYValue })
  }

  useEffect(() => {
    if (!isExists) return

    handleScrollChange()

    window.addEventListener('scroll', handleScrollChange)

    return () => window.removeEventListener('scroll', handleScrollChange)
  }, [isExists])

  const scrollTo = ({ x, y }: UpdateScrollPosition) => {
    const nextX: number = x ?? scroll.x
    const nextY: number = y ?? scroll.y
    window.scrollTo(nextX, nextY)
  }

  return [scroll, scrollTo]
}
