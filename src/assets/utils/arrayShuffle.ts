// Fisher-Yates Shuffle 算法（洗牌）

const fisherYatesShuffle = (arr: any[]) => {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1)) //random index
        ;[arr[i], arr[j]] = [arr[j], arr[i]] // swap
    }
}

export { fisherYatesShuffle }
