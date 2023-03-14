import sanityClient from 'part:@sanity/base/client'
import { VideoAsset } from '../types/sanity/VideoAsset'
import { Syncer } from './sanity/Syncer'
import { Paginator } from './sanity/Paginator'

const isContentLakeSupported = typeof sanityClient.withConfig === 'function'

class SanityClass {
  client = undefined
  syncer
  paginator
  query = `*[_type == "vimeo.videoAsset"]`

  constructor() {
    this.client = isContentLakeSupported
      ? sanityClient.withConfig({ apiVersion: '2021-05-17' })
      : sanityClient
    this.syncer = new Syncer(this)
    this.paginator = new Paginator(this)
  }

  initialize = (sanityClient, config) => {
    this.client = sanityClient(config)
  }


  createVimeoAsset = async (video) => {
    const videoDoc = new VideoAsset(video)
    try {
      await this.client.createIfNotExists(videoDoc)
    } catch (e) {
      console.error(e)
    }
  }

  createOrUpdateVimeoAsset = async (video) => {
    const videoDoc = new VideoAsset(video)
    try {
      await this.client.createOrReplace(videoDoc.videoAsset)
    } catch (e) {
      console.error(e)
    }
  }

  deleteVimeoAsset = async (videoId) => {
    try {
      await this.client.delete(videoId)
    } catch (e) {
      console.error(e)
    }
  }

  getAllVimeoAssets = async () => {
    try {
      return await this.client.fetch(this.query)
    } catch (e) {
      console.error(e)
      return []
    }
  }
}

export const Sanity = new SanityClass()
