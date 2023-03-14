import React, { useEffect, useState } from 'react'
import { VideoProvider } from './contexts/VideoContext'
import { SystemProvider } from './contexts/SystemContext'
import { Dashboard } from './components/Dashboard'
import PatchEvent, { set, unset } from '@sanity/form-builder/PatchEvent'
import { Box, Portal, ThemeProvider, ToastProvider, studioTheme } from '@sanity/ui'
import { SingleVideoBrowser } from './components/SingleVideoBrowser'
import { NoVideoSelected } from './components/NoVideoSelected'
import { VideoBrowser } from './components/VideoBrowser'
import sanityClient from 'part:@sanity/base/client'
import { QueryClientProvider, useQuery } from '@tanstack/react-query/build/umd/index.productions'

export const VimeoBrowser = React.forwardRef(VimeoBrowserImp)

const client = sanityClient.withConfig({ apiVersion: '2021-12-17' })
const queryClient = new QueryClient()

function VimeoBrowserImp(props, ref) {
  const { onFocus, onChange, value } = props
  const [showVideos, setShowVideos] = useState()

  const selectedVideo = useQuery(['videoAssets'], fetchVideoAssets)

  return (
    <SystemProvider {...{ onFocus }}>
      <QueryClientProvider client={queryClient}>
        <VideoProvider>
          <ThemeProvider scheme="light" theme={studioTheme}>
            <ToastProvider zOffset={60000}>
              {/*<Portal>*/}
              {/*<Box className="h-auto left-0 fixed top-0 w-full z-800000">*/}
              {showVideos
                ? <VideoBrowser
                    onClose={handleHideVideos}
                    onSelectVideo={handleOnSelectVideo}
                    {...{ ref }} />
                : value && selectedVideo.isSuccess
                  ? <SingleVideoBrowser video={selectedVideo.data} />
                  : <NoVideoSelected onClick={handleShowVideos} />}
              {/*<Dashboard {...{ ref }} />*/}
              {/*</Box>*/}
              {/*</Portal>*/}
            </ToastProvider>
          </ThemeProvider>
        </VideoProvider>
      </QueryClientProvider>
    </SystemProvider>
  )

  function handleShowVideos() {
    setShowVideos(true)
  }

  function handleHideVideos() {
    setShowVideos(false)
  }

  function fetchVideoAssets() {
    return client.fetch(
      '*[_id == $ref][0]',
      { ref: value.asset._ref })
  }


  function handleOnSelectVideo(asset) {
    const event = {
      _type: 'vimeo.video',
      _key: Math.random().toString(16).substring(3),
      asset: {
        _ref: asset.resource_key,
        _type: 'reference'
      }
    }

    onChange(PatchEvent.from(asset ? set(event) : unset()))
    handleHideVideos()
  }
}
