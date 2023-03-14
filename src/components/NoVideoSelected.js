import React, { useContext } from 'react'

import { Card } from '@sanity/ui'

export function NoVideoSelected({ onClick }) {
  return (
    <Card {...{ onClick }}>Select Vimeo video</Card>
  )
}
