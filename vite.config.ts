import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import pxtovw from 'postcss-px-to-viewport'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    css: {
        // css预处理器
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/assets/styles/mixin.scss";@import "@/assets/styles/color.scss";'
            }
        },
        postcss: {
            plugins: [
                pxtovw({
                    viewportWidth: 1680,
                    viewportHeight: 969.33,
                    unitPrecision: 3, 
                    virwportUnit: 'vw', 
                    selectorBlackList: ['.ignore'],
                    minPixelVlaue: 1,
                    mediaQuery: false
                })
            ]
        }
    },
    base: '/blue-archive-gacha-simulator/',
    build: {
        outDir: 'docs'
    }
})
