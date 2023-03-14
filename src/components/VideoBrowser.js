import React, { useCallback, useContext, useEffect } from 'react'
import { VideoContext } from '../contexts/VideoContext'

import { SingleVideoBrowser } from './SingleVideoBrowser'
import { SkipButtons } from './SkipButtons'
import { Box, Dialog, Grid } from '@sanity/ui'
import { Sanity } from '../services/Sanity'

export const VideoBrowser = ({ onClose, onSelectVideo }) => {
  const loadVideos = useCallback(() => {
    Sanity.paginator.getVideos()
  }, [])

  useEffect(() => {
    loadVideos()
  }, [loadVideos])

  const { allVideos, pagingState } = useContext(VideoContext)

  return (
    <Dialog
      header="Example"
      id="dialog-example"
      onClose={onClose}
      zOffset={1000}
      width={600}
    >
      <Box padding={4}>
        <Grid columns={[2, 3, 4, 6]} gap={[1, 1, 2, 3]} padding={4}>
          {allVideos.map((video) => (
            <SingleVideoBrowser key={video.link} {...{ video, onSelectVideo }} />
          ))}
        </Grid>
      </Box>
    </Dialog>
    // <>
    //   <div className="grid grid-cols-2 md:grid-cols-5">
    //     {allVideos.map((video) => (
    //       <SingleVideoBrowser key={video.link} {...{ video }} />
    //     ))}
    //   </div>
    //   <div className="flex justify-center pt-2">
    //     <SkipButtons index={pagingState?.currentPage || 1} maxIndex={pagingState?.maxPages || 1} nextLink={pagingState?.next} previousLink={pagingState?.previous} />
    //   </div>
    // </>
  )
}
