import React from 'react'
import { Vimeo } from '../services/Vimeo'
import { Sanity } from '../services/Sanity'

export const VideoContext = React.createContext({
  allVideos: [],
  loading: false,
})

export function VideoProvider({ children }) {
  const [allVideos, setAllVideos] = React.useState([])
  const [selectedVideo, setSelectedVideo] = React.useState()
  const [pagingState, setPagingState] = React.useState()
  const [loading, setLoading] = React.useState(false)

  Sanity.paginator.setCallbackFn(setPagingState, setAllVideos)
  Vimeo.setLoadingCallback(setLoading)

  return (
    <VideoContext.Provider
      value={{
        allVideos,
        selectedVideo,
        setSelectedVideo,
        pagingState,
        loading,
      }}
    >
      {children}
    </VideoContext.Provider>
  )
}


