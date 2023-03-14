import React, { useCallback, useContext, useEffect } from 'react';
import { VideoContext } from '../contexts/VideoContext';
import { TopBar } from './TopBar';
import { VideoBrowser } from './VideoBrowser';
import { LoadingSpinner } from './common/LoadingSpinner';
import Sanity from '../services/Sanity';

export const Dashboard() => {
    const { loading } = useContext(VideoContext)
    const loadVideos = useCallback(() => {
      Sanity.paginator.getVideos()
    }, [])

    useEffect(() => {
      loadVideos()
    }, [loadVideos])

    return (
      <div className="w-screen h-screen bg-gray-800 text-white">
        <div className="m-auto p-2 max-w-7xl">
        <TopBar />
          { loading ?  <LoadingSpinner /> :
            <div>
              <VideoBrowser />
            </div>
          }
        </div>
      </div>
    );
};
