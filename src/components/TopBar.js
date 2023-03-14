import React, { useContext } from 'react'
import { SystemContext } from '../contexts/SystemContext'
import { Sanity } from '../services/Sanity'
import { Button } from './common/Button'

export function TopBar() {
  const { onFocus, selecting } = useContext(SystemContext)

  return (
    <div className="flex justify-between pb-2">
      <div className="pl-2">
        <Button color="gray" onClick={() => Sanity.syncer.syncAllVideosWithSanity()}>
          Sync with Vimeo
        </Button>
      </div>
      <div>
        {selecting && <Button onClick={onFocus}>
          Close
        </Button>}
      </div>
    </div>
  )
}
