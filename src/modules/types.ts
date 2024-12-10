export type T_Specialist = {
    id: string
    name: string
    description: string
    image: string
    status: number
    comment?: string
}

export type T_Lecture = {
    id: string | null
    status: E_LectureStatus
    date_complete: string
    date_created: string
    date_formation: string
    owner: string
    moderator: string
    specialists: T_Specialist[]
    date: string
    room: string
}

export enum E_LectureStatus {
    Draft=1,
    InWork,
    Completed,
    Rejected,
    Deleted
}

export type T_User = {
    id: number
    username: string
    is_authenticated: boolean
}

export type T_LecturesFilters = {
    date_formation_start: string
    date_formation_end: string
    status: number
}

export type T_SpecialistsListResponse = {
    specialists: T_Specialist[],
    draft_lecture_id: number,
    specialists_count: number
}

export type T_LoginCredentials = {
    username: string
    password: string
}

export type T_RegisterCredentials = {
    name: string
    email: string
    password: string
}