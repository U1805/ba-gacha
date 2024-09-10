interface myStudent {
    Id: number
    Name: string
    StarGrade: number
}

interface resultItem extends myStudent {
    isNew: boolean
}

interface historyItem extends myStudent {
    Cnt: number
}

interface bannerItem extends myStudent {
    LastProb: number
    Prob: number
}

export type { myStudent, resultItem, historyItem, bannerItem }
