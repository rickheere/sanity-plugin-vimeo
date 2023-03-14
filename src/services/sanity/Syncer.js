import { Vimeo } from '../Vimeo'

export class Syncer {
  sanity

  constructor(sanity) {
    this.sanity = sanity
  }

  async getVideoAssetMap() {
    const videosAlreadySynced = await this.sanity.getAllVimeoAssets()
    const res = {}

    for (const video of videosAlreadySynced) {
      res[video.resource_key] = video
    }

    return res
  }

  syncVideo(videoToSync) {
    console.log(`Syncing video with id ${videoToSync.resource_key}`)
    return this.sanity.createOrUpdateVimeoAsset(videoToSync)
  }

  checkIfVideoHasBeenModified = (videoToSync, videoAlreadySynced) => {
    return videoAlreadySynced.modified_unix_time < videoToSync.modified_unix_time
  }

  syncOrSkipVideo = async (videoToSync, videoAlreadySynced) => {
    if (!videoAlreadySynced) return this.syncVideo(videoToSync)
    if (this.checkIfVideoHasBeenModified(videoToSync, videoAlreadySynced)) return this.syncVideo(videoToSync)
    return console.log(`Skipping video with id ${videoToSync.resource_key}`)
  }

  deleteVideo = (videoIdToDelete) => {
    console.log(`Deleting video with id ${videoIdToDelete}`)
    return this.sanity.deleteVimeoAsset(videoIdToDelete)
  }

  deleteVideos(videosAlreadySynced, videosToKeep) {
    const promises = []
    for (const videoId of Object.keys(videosAlreadySynced)) {
      const shouldKeepVideo = videosToKeep[videoId]
      if (shouldKeepVideo) continue
      promises.push(this.deleteVideo(videoId))
    }
    return Promise.all(promises)
  }

  async syncAllVideosWithSanity() {
    const videosAlreadySynced = await this.getVideoAssetMap()
    const videosToKeep = {}
    let nextResponse = await Vimeo.allVideos.getFirst()

    const promises = []

    while (nextResponse && nextResponse.data) {
      let videos = nextResponse.data
      for (const video of videos) {
        if (!video.resource_key) {
          console.error(`Video with title: ${video.name} didn't have an id. We can therefore not process it at this time`)
          continue
        }
        videosToKeep[video.resource_key] = video.resource_key
        promises.push(this.syncOrSkipVideo(video, videosAlreadySynced[video.resource_key]))
      }
      videos = []
      nextResponse = await Vimeo.allVideos.getNext()
    }
    await Promise.all(promises)
    await this.deleteVideos(videosAlreadySynced, videosToKeep)
  }
}
