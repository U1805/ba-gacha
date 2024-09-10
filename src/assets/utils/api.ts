const getAvatarBg = (id: string|number) => `https://schale.gg/images/student/collection/${id}.webp`

const getAvatarNoBg = (id: string|number) => `https://beta.schaledb.com/images/student/icon/${id}.webp`

const getVideoPaths = () => {
    const base_url = '/ba-gacha/Gacha/'
    const videos = {
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

export { getAvatarBg, getAvatarNoBg, getVideoPaths }
