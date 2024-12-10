import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Lecture, T_LecturesFilters, T_Specialist} from "modules/types.ts";
import {NEXT_YEAR, PREV_YEAR} from "modules/consts.ts";
import {api} from "modules/api.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AxiosResponse} from "axios";

type T_LecturesSlice = {
    draft_lecture_id: number | null,
    specialists_count: number | null,
    lecture: T_Lecture | null,
    lectures: T_Lecture[],
    filters: T_LecturesFilters,
    save_mm: boolean
}

const initialState:T_LecturesSlice = {
    draft_lecture_id: null,
    specialists_count: null,
    lecture: null,
    lectures: [],
    filters: {
        status: 0,
        date_formation_start: PREV_YEAR.toISOString().split('T')[0],
        date_formation_end: NEXT_YEAR.toISOString().split('T')[0],
        owner: ""
    },
    save_mm: false
}

export const fetchLecture = createAsyncThunk<T_Lecture, string, AsyncThunkConfig>(
    "lectures/lecture",
    async function(lecture_id) {
        const response = await api.lectures.lecturesRead(lecture_id) as AxiosResponse<T_Lecture>
        return response.data
    }
)

export const fetchLectures = createAsyncThunk<T_Lecture[], object, AsyncThunkConfig>(
    "lectures/lectures",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState()

        const response = await api.lectures.lecturesList({
            status: state.lectures.filters.status,
            date_formation_start: state.lectures.filters.date_formation_start,
            date_formation_end: state.lectures.filters.date_formation_end
        }) as AxiosResponse<T_Lecture[]>

        return response.data.filter(lecture => lecture.owner.includes(state.lectures.filters.owner))
    }
)

export const removeSpecialistFromDraftLecture = createAsyncThunk<T_Specialist[], string, AsyncThunkConfig>(
    "lectures/remove_specialist",
    async function(specialist_id, thunkAPI) {
        const state = thunkAPI.getState()
        const response = await api.lectures.lecturesDeleteSpecialistDelete(state.lectures.lecture.id, specialist_id) as AxiosResponse<T_Specialist[]>
        return response.data
    }
)

export const deleteDraftLecture = createAsyncThunk<void, object, AsyncThunkConfig>(
    "lectures/delete_draft_lecture",
    async function(_, {getState}) {
        const state = getState()
        await api.lectures.lecturesDeleteDelete(state.lectures.lecture.id)
    }
)

export const sendDraftLecture = createAsyncThunk<void, object, AsyncThunkConfig>(
    "lectures/send_draft_lecture",
    async function(_, {getState}) {
        const state = getState()
        await api.lectures.lecturesUpdateStatusUserUpdate(state.lectures.lecture.id)
    }
)

export const updateLecture = createAsyncThunk<void, object, AsyncThunkConfig>(
    "lectures/update_lecture",
    async function(data, {getState}) {
        const state = getState()
        await api.lectures.lecturesUpdateUpdate(state.lectures.lecture.id, {
            ...data
        })
    }
)

export const updateSpecialistValue = createAsyncThunk<void, object, AsyncThunkConfig>(
    "lectures/update_mm_value",
    async function({specialist_id, comment},thunkAPI) {
        const state = thunkAPI.getState()
        await api.lectures.lecturesUpdateSpecialistUpdate(state.lectures.lecture.id, specialist_id, {comment})
    }
)

export const acceptLecture = createAsyncThunk<void, string, AsyncThunkConfig>(
    "lectures/accept_lecture",
    async function(lecture_id,{dispatch}) {
        await api.lectures.lecturesUpdateStatusAdminUpdate(lecture_id, {status: 3})
        await dispatch(fetchLectures)
    }
)

export const rejectLecture = createAsyncThunk<void, string, AsyncThunkConfig>(
    "lectures/accept_lecture",
    async function(lecture_id,{dispatch}) {
        await api.lectures.lecturesUpdateStatusAdminUpdate(lecture_id, {status: 4})
        await dispatch(fetchLectures)
    }
)

const lecturesSlice = createSlice({
    name: 'lectures',
    initialState: initialState,
    reducers: {
        saveLecture: (state, action) => {
            state.draft_lecture_id = action.payload.draft_lecture_id
            state.specialists_count = action.payload.specialists_count
        },
        removeLecture: (state) => {
            state.lecture = null
        },
        triggerUpdateMM: (state) => {
            state.save_mm = !state.save_mm
        },
        updateFilters: (state, action) => {
            state.filters = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLecture.fulfilled, (state:T_LecturesSlice, action: PayloadAction<T_Lecture>) => {
            state.lecture = action.payload
        });
        builder.addCase(fetchLectures.fulfilled, (state:T_LecturesSlice, action: PayloadAction<T_Lecture[]>) => {
            state.lectures = action.payload
        });
        builder.addCase(removeSpecialistFromDraftLecture.rejected, (state:T_LecturesSlice) => {
            state.lecture = null
        });
        builder.addCase(removeSpecialistFromDraftLecture.fulfilled, (state:T_LecturesSlice, action: PayloadAction<T_Specialist[]>) => {
            if (state.lecture) {
                state.lecture.specialists = action.payload as T_Specialist[]
            }
        });
        builder.addCase(sendDraftLecture.fulfilled, (state:T_LecturesSlice) => {
            state.lecture = null
        });
    }
})

export const { saveLecture, removeLecture, triggerUpdateMM, updateFilters } = lecturesSlice.actions;

export default lecturesSlice.reducer