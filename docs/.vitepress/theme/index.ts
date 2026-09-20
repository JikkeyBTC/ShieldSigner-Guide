import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import './custom.css'
import MediaPlaceholder from './components/MediaPlaceholder.vue'
import Callout from './components/Callout.vue'
import BackupMatrix from './components/BackupMatrix.vue'
import ImageZoom from './components/ImageZoom.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('MediaPlaceholder', MediaPlaceholder)
    app.component('Callout', Callout)
    app.component('BackupMatrix', BackupMatrix)
    app.component('ImageZoom', ImageZoom)
  }
} satisfies Theme
