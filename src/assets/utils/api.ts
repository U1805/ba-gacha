const getSchaledbInfo = (pathname: string) => 'https://schale.gg/?chara=' + pathname

const getSchaledbAvatar = (id: string) => `https://schale.gg/images/student/collection/${id}.webp`

const getFandomAvatar = (pathname: string) =>
    `https://wsrv.nl/?url=` + `https://static.wikia.nocookie.net/blue-archive/images/${pathname}.png`

const getVideoPaths = () => {
    // const base_url = 'https://BlueArcbox.github.io/resources/Gacha/'
    const base_url = '/Gacha/'
    const videos = {
        preview: base_url + 'Preview0.mp4',
        arona_normal: base_url + 'arona_normal.mp4',
        arona_special: base_url + 'arona_special.mp4',
        wait_normal: base_url + 'wait_normal.mp4',
        wait_special: base_url + 'wait_special.mp4',
        sign_normal: base_url + 'sign_normal.mp4',
        sign_special: base_url + 'sign_special.mp4',
        sign_special2: base_url + 'sign_special2.mp4'
    }
    return videos
}

export { getFandomAvatar, getSchaledbAvatar, getSchaledbInfo, getVideoPaths }
