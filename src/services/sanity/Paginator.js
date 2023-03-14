
let videosSubscription

export class Paginator {
  sanity
  paging = {
    maxPages: 1,
    totalNumberOfVideos: 0,
    currentPage: 1,
    videosPerPage: 25
  }
  startIndex = 0
  endIndex = 25
  videos = {}
  callbackStateFn = undefined
  callbackAllVideosFn = undefined

  constructor(sanity) {
    this.sanity = sanity
  }

  get queryAndParams() {
    const query = `${this.sanity.query} | order(_createdAt desc) [$start ... $stop]`
    const params = { start: this.startIndex, stop: this.endIndex }
    return { query, params }
  }

  async getTotalNumberOfVideos() {
    const query = `count(${this.sanity.query})`
    this.paging.totalNumberOfVideos = await this.sanity.client.fetch(query)
    this.updatePagingState()
  }

  get videoArray() {
    return Object.values(this.videos).sort((videoA, videoB) => {
      return videoB.created_unix_time - videoA.created_unix_time
    }).slice(0, this.paging.videosPerPage)
  }

  async getVideos() {
    const { query, params } = this.queryAndParams
    const initialData = await this.sanity.client.fetch(query, params)
    await this.getTotalNumberOfVideos()
    this.callCallbackAllVideosFn(initialData)
    this.updatePagingState()
    this.videos = this.getVideoAssetMap(initialData)
    await this.registerPaginatorSubscription()
  }

  registerPaginatorSubscription = async () => {
    const { query, params } = this.queryAndParams
    if (videosSubscription) videosSubscription.unsubscribe()
    videosSubscription = this.sanity.client.listen(query, params).subscribe(async () => {
      // When the logic for updating videos on the go is implemented, we can uncomment these again
      // this.getTotalNumberOfVideos()
      // this.updateVideos(data)
      await this.getVideos()
      this.updatePagingState()
    })
  }

  getVideoAssetMap = (videos) => {
    const res = {}
    for (const video of videos) {
      res[video.resource_key] = video
    }
    return res
  }

  updateVideos(event) {
    const tmpVideos = { ...this.videos }
    // TODO: Implement logic for fetching new videos when we delete one here
    if (event.transition === 'disappear') {
      delete tmpVideos[event.documentId]
    } else if (event.result) {
      tmpVideos[event.documentId] = event.result
    }
    this.videos = tmpVideos
    this.callCallbackAllVideosFn(this.videoArray)
  }

  setCallbackFn(callbackStateFn, callbackAllVideosFn) {
    this.callbackStateFn = callbackStateFn
    this.callbackAllVideosFn = callbackAllVideosFn
  }

  callCallbackStateFn(state) {
    if (!this.callbackStateFn) return console.error('No callback function for state provided. This is necessary to keep the application reactive.')

    this.callbackStateFn(state)
  }

  callCallbackAllVideosFn(videos) {
    if (!this.callbackAllVideosFn) return console.error('No callback function for videos provided. This is necessary to keep the application reactive.')
    this.callbackAllVideosFn(videos)
  }

  updatePagingState = () => {
    const newPaging = { ...this.paging }

    newPaging.maxPages = Math.floor(this.paging.totalNumberOfVideos / this.paging.videosPerPage) + 1

    delete newPaging.next
    if (this.paging.currentPage < this.paging.maxPages) {
      newPaging.next = this.getNext
    }

    delete newPaging.previous
    if (this.paging.currentPage > 1) {
      newPaging.previous = this.getPrevious
    }

    this.paging = newPaging
    this.callCallbackStateFn(newPaging)
  }

  getNext = async () => {
    if (!this.paging.next) {
      return console.error('Could not find any next paging call.')
    }
    this.paging.currentPage++
    this.startIndex = this.startIndex + this.paging.videosPerPage
    this.endIndex = this.endIndex + this.paging.videosPerPage
    this.callCallbackStateFn(this.paging)
    await this.getVideos()
  }

  getPrevious = async () => {
    if (!this.paging.previous) {
      return console.error('Could not find any previous paging call.')
    }
    this.paging.currentPage--
    this.startIndex = this.startIndex - this.paging.videosPerPage
    this.endIndex = this.endIndex - this.paging.videosPerPage
    this.callCallbackStateFn(this.paging)
    await this.getVideos()
  }
}
