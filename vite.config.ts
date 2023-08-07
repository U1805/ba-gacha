import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import pxtovw from 'postcss-px-to-viewport'
import stylePxToVw from './style-px-to-vw'

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
                    unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to. 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
                    virwportUnit: 'vw', // (String) Expected units. 指定需要转换成的视窗单位，建议使用vw
                    selectorBlackList: ['.ignore'], // (Array) The selectors to ignore and leave as px. 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
                    minPixelVlaue: 1, // (Number) Set the minimum pixel value to replace. 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
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
