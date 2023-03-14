import React from 'react';
import VimeoWrapper from '../services/Vimeo';
import VideoResponse from '../types/vimeo/VideoResponse'
import { PagingState } from '../services/sanity/Paginator'
import Sanity from '../services/Sanity';

interface VideoContextProps {
  allVideos: VideoResponse[];
  selectedVideo?: VideoResponse;
  setSelectedVideo: (video: VideoResponse) => void
  pagingState?: PagingState
  loading: boolean
}

export const VideoContext = React.createContext<VideoContextProps>({
  allVideos: [],
  setSelectedVideo: (video) => null,
  loading: false,
});

const VideoProvider: React.FC = ({ children }) => {
  const [allVideos, setAllVideos] = React.useState<VideoResponse[]>([]);
  const [selectedVideo, setSelectedVideo] = React.useState<VideoResponse | undefined>()
  const [pagingState, setPagingState] = React.useState<PagingState>()
  const [loading, setLoading] = React.useState(false)

  Sanity.paginator.setCallbackFn(setPagingState, setAllVideos)
  VimeoWrapper.setLoadingCallback(setLoading)

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
  );
};

export default VideoProvider;


