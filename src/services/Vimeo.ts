
import axios from 'axios'
import AllVideos from './vimeo/AllVideos'

class Vimeo {
  protected apiKey? = '3a36dec27ecaa444524000bafd41ec28'
  allVideos: AllVideos
  protected loadingCallbackFn?: (loading: boolean) => void

  constructor() {
    this.allVideos = new AllVideos(this)
  }

  setApiKey = (apiKey: string) => {
    this.apiKey = apiKey
  }

  setLoadingCallback = (callbackFn: (loading: boolean) => void) => this.loadingCallbackFn = callbackFn

  get baseHeader(): { [id: string]: string } {
    return { Authorization: `Bearer ${this.apiKey}` }
  }

  getUrl = async (url: string) => {
    if (this.loadingCallbackFn) this.loadingCallbackFn(true)
    console.log(this);
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

export default new Vimeo()
