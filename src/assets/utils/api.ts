const getAvatarBg = (id: string|number) => `https://schale.gg/images/student/collection/${id}.webp`

const getAvatarNoBg = (id: string|number) => `https://beta.schaledb.com/images/student/icon/${id}.webp`

const getVideoPaths = () => {
    const videos = {
        arona: [
            'https://thumbsnap.com/i/p1NQdUNp.mp4', // arona_normal.mp4
            'https://thumbsnap.com/i/JMG87Vuj.mp4', // arona_special.mp4
            'https://thumbsnap.com/i/p1NQdUNp.mp4', // arona_normal.mp4
        ],
        wait: [
            'https://thumbsnap.com/i/QWAoRYfz.mp4', // wait_normal.mp4
            'https://thumbsnap.com/i/JiSP5QFF.mp4', // wait_special.mp4
            'https://thumbsnap.com/i/QWAoRYfz.mp4', // wait_normal.mp4
        ],
        sign: [
            'https://thumbsnap.com/i/XEAELMLQ.mp4', // sign_normal.mp4
            'https://thumbsnap.com/i/3LXYXnek.mp4', // sign_special.mp4
            'https://thumbsnap.com/i/3LXYXnek.mp4', // sign_special.mp4
        ],
        preview: [
            'https://thumbsnap.com/i/Cte3fY43.mp4', // Gacha_Banner_Normal_gb
            'https://thumbsnap.com/i/ak16qZdv.mp4', // Gacha_Banner_3star_gb
            'https://thumbsnap.com/i/C6iE4g1n.mp4', // Gacha_Banner_220322_gb_1
        ]
    }
    return videos
}

export { getAvatarBg, getAvatarNoBg, getVideoPaths }
