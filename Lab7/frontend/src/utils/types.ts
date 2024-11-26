export type T_Specialist =  {
    id: string,
    name: string,
    description: string,
    image: string,
    status: number,
    comment: string
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
    field: string
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
    email: string
    is_authenticated: boolean
    validation_error: boolean
    validation_success: boolean
    checked: boolean
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

export type T_SpecialistsListResponse = {
    specialists: T_Specialist[],
    draft_lecture_id: number,
    specialists_count: number
}