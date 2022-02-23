import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'

import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Markdown from 'vite-plugin-md'
import Prism from 'markdown-it-prism'
import InlineCodeClass from './utils/inlineCodeClass'
import Anchor from 'markdown-it-anchor'
import Inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Unocss({
      presets: [presetAttributify(), presetUno()]
    }),

    Vue({
      include: [/\.vue$/, /\.md$/]
    }),

    Pages({
      extensions: ['vue', 'md'],
      exclude: ['**/components/*.vue']
    }),

    Layouts(),

    AutoImport({
      imports: ['vue', 'vue-router']
    }),

    Components({
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/]
    }),

    MdPreprocess(),

    Markdown({
      wrapperComponent: 'post',
      wrapperClasses: 'md-wrapper',
      markdownItSetup: (md) => {
        md.use(Prism)

        md.use(InlineCodeClass)

        md.use(Anchor, {
          permalink: Anchor.permalink.linkInsideHeader({
            symbol: '#',
            renderAttrs: () => ({ 'aria-hidden': 'true' })
          })
        })
      }
    }),

    Inspect()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
