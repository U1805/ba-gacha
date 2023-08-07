import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

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
        }
    },
    base: '/blue-archive-gacha-simulator/',
    build: {
        outDir: 'build'
    }
})
