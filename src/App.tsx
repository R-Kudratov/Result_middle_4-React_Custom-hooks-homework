import './App.css'

import { useViewportSize } from './hooks/useViewportSize'

export function App() {
  const { height, width } = useViewportSize()

  return (
    <>
      Width: {width}, height: {height}
    </>
  )
}
