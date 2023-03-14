import { def } from '@sanity/base'
import { VimeoBrowser } from './VimeoBrowser'
import { Vimeo } from './services/Vimeo'
import './styles/tailwind.css'
import Icon from './icon/Icon.svg'
const setApiKey = Vimeo.setApiKey

export { setApiKey }

export default {
  name: 'vimeo',
  title: 'Vimeo',
  component: VimeoBrowser,
  icon: Icon
}
