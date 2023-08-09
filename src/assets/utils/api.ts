const getSchaledbInfo = (pathname: string) => 'https://schale.gg/?chara=' + pathname

const getSchaledbAvatar = (pathname: string) => `https://schale.gg/images/student/collection/${pathname}.webp`

const getFandomAvatar = (pathname: string) =>
    `https://static.wikia.nocookie.net/blue-archive/images/${pathname}.png`

const getPreviewVideo = () =>
    'https://fs-im-kefu.7moor-fs1.com/29397395/4d2c3f00-7d4c-11e5-af15-41bf63ae4ea0/1691494716332/Preview0.mp3'

export { getFandomAvatar, getSchaledbAvatar, getSchaledbInfo, getPreviewVideo }
