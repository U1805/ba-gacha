interface myStudent {
    Id: number
    Name: string
    PathName: string
    StarGrade: number
    Avatar: string
}

interface resultItem {
    PathName: string
    StarGrade: number
    Avatar: string
    isNew: boolean
}

interface historyItem extends myStudent {
    Cnt: number
}

export type { myStudent, resultItem, historyItem }
