
import axios from 'axios'
import { AllVideos } from './vimeo/AllVideos'

class VimeoClass {
  apiKey = '3a36dec27ecaa444524000bafd41ec28'
  allVideos
  loadingCallbackFn

  constructor() {
    this.allVideos = new AllVideos(this)
  }

  setApiKey(apiKey) {
    this.apiKey = apiKey
  }

  setLoadingCallback(callbackFn) {
    this.loadingCallbackFn = callbackFn
  }

  get baseHeader() {
    return { Authorization: `Bearer ${this.apiKey}` }
  }

  async getUrl(url) {
    if (this.loadingCallbackFn) this.loadingCallbackFn(true)
    const headers = { Authorization: `Bearer ${this.apiKey}` }

    try {
      const res = await axios.get(`https://api.vimeo.com${url}`, { headers })
      if (this.loadingCallbackFn) this.loadingCallbackFn(false)
      return res.data
    } catch (e) {
      console.log(e)
      if (this.loadingCallbackFn) this.loadingCallbackFn(false)
    }
  }
}

export const Vimeo = new VimeoClass()
