import axios from "axios"
import type { myStudent } from "./interface"

const getAvatarBg = (id: string|number) => `https://schale.gg/images/student/collection/${id}.webp`

const getAvatarNoBg = (id: string|number) => `https://beta.schaledb.com/images/student/icon/${id}.webp`

const getVideoPaths = () => {
    const base_url = '/ba-gacha/Gacha/'
    const videos = {
        preview: base_url + 'Preview0.mp4',
        arona: [
            base_url + 'arona_normal.mp4',
            base_url + 'arona_special.mp4',
            base_url + 'arona_normal.mp4',
        ],
        wait: [
            base_url + 'wait_normal.mp4',
            base_url + 'wait_special.mp4',
            base_url + 'wait_normal.mp4',
        ],
        sign: [
            base_url + 'sign_normal.mp4',
            base_url + 'sign_special.mp4',
            base_url + 'sign_special.mp4',
        ]
    }
    return videos
}

const fetchData = async ()=>{
    const data = (await axios.get("/ba-gacha/non_limited_students.json")).data as any[]
    
    return data.map(item => {
        return {
            Id: item.Id,
            Name: item.Name,
            StarGrade: item.StarGrade
        } as myStudent
    }) as myStudent[]
}

export { getAvatarBg, getAvatarNoBg, getVideoPaths, fetchData }
