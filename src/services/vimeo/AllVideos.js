
export class AllVideos {
  baseUrl = '/me/videos'
  vimeo
  paging = {}

  constructor(vimeo) {
    this.vimeo = vimeo
  }

  async getVideos(url) {
    const res = await this.vimeo.getUrl(url)
    return this.sanitizeResponse(res)
  }

  async getFirst() {
    const res = await this.getVideos(this.baseUrl)
    return res
  }

  sortFiles (files) {
    files.sort((fileA, fileB) => fileB.size - fileA.size)
  }

  // We strip the video here, so we don't upload too much to Sanity
  stripVideo(video) {
    return {
      created_time: video.created_time,
      created_unix_time: new Date(video.created_time).valueOf(),
      description: video.description,
      files: this.sortFiles(video.files),
      is_playable: video.is_playable,
      link: video.link,
      manage_link: video.manage_link,
      modified_time: video.modified_time,
      modified_unix_time: new Date(video.modified_time).valueOf(),
      name: video.name,
      pictures: video.pictures,
      privacy: video.privacy,
      release_time: video.release_time,
      resource_key: video.resource_key,
      status: video.status
    }
  }

  sanitizeResponse (response) {
    if (!response) {
      console.error('Response was empty')
      return
    }
    this.paging = response.paging

    const strippedVideos = []
    for (const video of response?.data) {
      strippedVideos.push(this.stripVideo(video))
    }
    response.data = strippedVideos
    response.max_index = Math.round((response.total || 1) / (response.per_page || 1))
    return response
  }

  async getNext() {
    if (!this.paging.next) {
      console.error('Could not find any next paging call.')
      return
    }
    const res = await this.getVideos(this.paging.next)
    return res
   }

  async getPrevious() {
    if (!this.paging.previous) {
      console.error('Could not find any previous paging call.')
      return
    }
    const res = await this.getVideos(this.paging.previous)
    return res
  }
}
