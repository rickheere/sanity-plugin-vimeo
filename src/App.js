import React from 'react'
import { VideoProvider } from './contexts/VideoContext'
import { SystemProvider } from './contexts/SystemContext'
import { Dashboard } from './components/Dashboard'
import PatchEvent, { set, unset } from '@sanity/form-builder/PatchEvent'
import { Box, Portal, ThemeProvider, ToastProvider, studioTheme } from '@sanity/ui'

export const VimeoBrowser = React.forwardRef(App)

function App(props, ref, ...a) {
  console.log({ props, ref, ...a })
  const { onFocus, onChange } = props

  return (
    <SystemProvider {...{ onFocus, onSelect }}>
      <VideoProvider>
        <ThemeProvider scheme="light" theme={studioTheme}>
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

  function onSelect(asset) {
    const event = {
      _type: 'vimeo.video',
      _key: Math.random().toString(16).substring(3),
      asset: {
        _ref: asset.resource_key,
        _type: 'reference'
      }
    }

    onChange(PatchEvent.from(asset ? set(event) : unset()))
  }
}
