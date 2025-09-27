import { useState } from 'react'

type LocalStorageSetValue = string
type LocalStorageReturnValue = LocalStorageSetValue | null

type UseLocalStorage = (key: string) => [
  value: LocalStorageReturnValue,
  {
    setItem: (value: LocalStorageSetValue) => void
    removeItem: () => void
  }
]

export const useLocalStorage: UseLocalStorage = (key) => {
  const [value, setValue] = useState<LocalStorageReturnValue>(() => localStorage.getItem(key))

  function setItem(itemValue: LocalStorageSetValue) {
    localStorage.setItem(key, itemValue)
    setValue(itemValue)
  }

  function removeItem() {
    localStorage.removeItem(key)
    setValue(null)
  }

  return [
    value,
    {
      setItem,
      removeItem,
    },
  ]
}
