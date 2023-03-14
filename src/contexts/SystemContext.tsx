import React, { createContext, useState } from 'react';
import VideoResponse from '../types/vimeo/VideoResponse';

interface SystemContextProps {
  selecting: boolean
  setSelecting: (selecting: boolean) => void,
  onSelect: (asset: VideoResponse) => void,
  onFocus: () => void
}

export const SystemContext = createContext<SystemContextProps>({
  selecting: false,
  setSelecting: (selecting) => null,
  onSelect: () => null,
  onFocus: () => null
});

interface SystemProviderProps {
  onFocus: () => void,
  onSelect: (doc: VideoResponse) => void,
}

const SystemProvider: React.FC<SystemProviderProps> = ({onSelect, onFocus, children }) => {
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
  );
};

export default SystemProvider;


