import React from 'react'

export function Button({ color = 'red', onClick, children }) {
  const colorString = `bg-${color}-400`

  return (
    <button className={`${colorString} p-2 mr-2 rounded text-white hover:shadow-xl`} {...{ onClick }}>
      {children}
    </button>
  )
}
