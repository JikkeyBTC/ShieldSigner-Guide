import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import './custom.css'
import MediaPlaceholder from './components/MediaPlaceholder.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('MediaPlaceholder', MediaPlaceholder)
  }
} satisfies Theme
