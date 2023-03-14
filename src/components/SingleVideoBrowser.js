import React, { useContext } from 'react'
import { SystemContext } from '../contexts/SystemContext'
import { Card } from '@sanity/ui'

export function SingleVideoBrowser({ video, onSelectVideo }) {
  console.log({ video })
  const image = video.pictures.sizes[2]
  const { selecting } = useContext(SystemContext)

  return (
    <Card
      title={video.name}
      onClick={() => onSelectVideo(video)}
      width={image.height}
      height={image.width}
    >
      <img src={image.link} height={image.height} width={image.width} alt={video.name} />
      <div className="absolute bottom-1 p-2 text-sm truncate max-w-full">{video.name}</div>
    </Card>
  )
}
