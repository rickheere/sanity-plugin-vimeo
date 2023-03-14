import React from 'react'
import VideoProvider from './contexts/VideoContext'
import SystemProvider from './contexts/SystemContext'
import Dashboard from './components/Dashboard'
import { SanityDocument, SanityAssetDocument, SanityImageAssetDocument } from '@sanity/client'
import PatchEvent, { set, unset } from '@sanity/form-builder/PatchEvent'
import {Box, Portal, ThemeProvider, ToastProvider, studioTheme, PortalProvider} from '@sanity/ui'
import VideoResponse from './types/vimeo/VideoResponse'

interface VimeoBrowserProps {
  document: SanityDocument
  onFocus: () => void
  onChange: (event: any) => void
  selectedAssets?: (SanityAssetDocument | SanityImageAssetDocument)[]
}

const VimeoBrowser: React.FC<VimeoBrowserProps> = React.forwardRef((props, ref) => {
  const { onFocus, onChange } = props

  const onSelect = (asset: VideoResponse) => {
    const event = {
      _type: 'vimeo.video',
      _key: Math.random().toString(16).substring(3),
      asset: {
        _ref: asset.resource_key,
        _type: "reference"
      }
    }
    onChange(PatchEvent.from(asset ? set(event) : unset()))
  }

  return (
    <SystemProvider {...{ onFocus, onSelect }}>
      <VideoProvider>
        <ThemeProvider scheme="dark" theme={studioTheme}>
          <ToastProvider zOffset={60000}>
            <Portal>
              <Box {...{ ref }} className="h-auto left-0 fixed top-0 w-full z-800000">
                <Dashboard />
              </Box>
            </Portal>
          </ToastProvider>
        </ThemeProvider>
      </VideoProvider>
    </SystemProvider>
  )
})

export default VimeoBrowser
