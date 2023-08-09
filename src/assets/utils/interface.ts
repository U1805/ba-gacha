interface myStudent {
    Id: number
    Name: string
    PathName: string
    StarGrade: number
    Avatar: string
    Collection: string
}

// example:
//     {
//     "Id": 10000,
//     "Name": "阿露",
//     "PathName": "Aru",
//     "StarGrade": 3,
//     "Avatar": "d/de/Aru_Icon",
//     "Collection": "Student_Portrait_Aru_Collection"
// },
// avatar(fandomwiki): https://static.wikia.nocookie.net/blue-archive/images/{Avatar}.png
// avatar(schaledb): https://schale.gg/images/student/collection/{Colloction}.webp

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
