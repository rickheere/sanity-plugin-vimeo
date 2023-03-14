
export class VideoAsset {
  videoAsset

  constructor(video) {
    this.videoAsset = this.generateAsset(video)
  }

  addTypeAndKeyToObject = (object, _type) => ({
    _type,
    _key: Math.random().toString(16).substring(3),
    ...object
  })

  generateDownloadObject = (downloadQualities) => {
    return downloadQualities.map((quality) => (this.addTypeAndKeyToObject(quality, 'vimeo.video.downloadQuality')))
  }

  generatePicturesObject = (pictures) => {
    return {
      ...pictures,
      _type: 'vimeo.video.pictures',
      sizes: pictures.sizes.map((size) => (this.addTypeAndKeyToObject(size, 'vimeo.picture.size'))),
    }
  }

  generatePrivacyObject(privacy) {
    return {
      ...privacy,
      _type: 'vimeo.video.privacy'
    }
  }


  generateAsset(video) {
    const base = {
      ...video,
      _createdAt: video.created_time,
      _updatedAt: video.modified_time,
      _id: video.resource_key,
      _type: 'vimeo.videoAsset',
      _rev: ''
    }

    base.files = this.generateDownloadObject(base.files)
    base.pictures = this.generatePicturesObject(base.pictures)
    base.privacy = this.generatePrivacyObject(base.privacy)
    return base
  }
}
