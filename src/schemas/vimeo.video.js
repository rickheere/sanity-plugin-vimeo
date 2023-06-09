import { VimeoBrowser } from '../VimeoBrowser'

export default {
  name: 'vimeo.video',
  type: 'object',
  title: 'Vimeo Video',
  inputComponent: VimeoBrowser,
  fields: [
    {
      title: 'Video',
      name: 'asset',
      type: 'reference',
      weak: true,
      to: [{ type: 'vimeo.videoAsset' }]
    }
  ],
  preview: {
    select: {
      imageUrl: 'asset.pictures.sizes[1].link',
      title: 'asset.name'
    }
  }
}
