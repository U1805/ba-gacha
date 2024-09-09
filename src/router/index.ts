import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import VideoView from '@/views/VideoView.vue'
import ResultView from '@/views/ResultView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'main',
            component: MainView
        },
        {
            path: '/gacha',
            name: 'gacha',
            component: VideoView
        },
        {
            path: '/result',
            name: 'result',
            component: ResultView
        }
    ]
})

export default router
