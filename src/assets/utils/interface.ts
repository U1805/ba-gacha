interface myStudent {
    Id: number
    Name: string
    StarGrade: number
    Avatar: string
}

interface resultItem extends myStudent {
    isNew: boolean
}

interface historyItem {
    Id: number
    Cnt: number
}

export type { myStudent, resultItem, historyItem }
