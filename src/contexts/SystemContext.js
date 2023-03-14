import React, { createContext, useState } from 'react'

export const SystemContext = createContext({})

export const SystemProvider = ({ onSelect, onFocus, children }) => {
  const [selecting, setSelecting] = useState(false)

  return (
    <SystemContext.Provider
      value={{
        selecting,
        setSelecting,
        onSelect,
        onFocus
      }}
    >
      {children}
    </SystemContext.Provider>
  )
}
