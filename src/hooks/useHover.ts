import { useEffect, useRef, useState } from 'react'

type UseHover = () => {
  hovered: boolean
  ref: React.RefObject<HTMLElement | null>
}

export const useHover: UseHover = () => {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const htmlElement = ref.current
    if (!htmlElement) return

    const handleMouseEnter = () => setHovered(true)
    const handleMouseLeave = () => setHovered(false)

    htmlElement.addEventListener('mouseenter', handleMouseEnter)
    htmlElement.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      htmlElement.removeEventListener('mouseenter', handleMouseEnter)
      htmlElement.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return {
    hovered,
    ref,
  }
}
