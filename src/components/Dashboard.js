import React, { useCallback, useContext, useEffect } from 'react'
import { VideoContext } from '../contexts/VideoContext'
import { TopBar } from './TopBar'
import { VideoBrowser } from './VideoBrowser'
import { LoadingSpinner } from './common/LoadingSpinner'
import { Sanity } from '../services/Sanity'
import { Box, Dialog, Text } from '@sanity/ui'

export function Dashboard({ onClose }) {
  // const { loading } = useContext(VideoContext)
  const loadVideos = useCallback(() => {
    Sanity.paginator.getVideos()
  }, [])

  useEffect(() => {
    loadVideos()
  }, [loadVideos])

  return (
    <Dialog
      header="Example"
      id="dialog-example"
      onClose={onClose}
      zOffset={1000}
    >
      <Box padding={4}>
        <VideoBrowser />
      </Box>
    </Dialog>
    // <div className="w-screen h-screen bg-gray-800 text-white">
    //   <div className="m-auto p-2 max-w-7xl">
    //     <TopBar />
    //     { loading ?  <LoadingSpinner /> :
    //     <div>
    //       <VideoBrowser />
    //     </div>
    //     }
    //   </div>
    // </div>
  )
}
