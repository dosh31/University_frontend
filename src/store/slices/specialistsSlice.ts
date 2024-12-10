import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Specialist, T_SpecialistAddData, T_SpecialistsListResponse} from "modules/types.ts";
import {api} from "modules/api.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AxiosResponse} from "axios";
import {saveLecture} from "store/slices/lecturesSlice.ts";
import {Specialist} from "src/api/Api.ts";

type T_SpecialistsSlice = {
    specialist_name: string
    specialist: null | T_Specialist
    specialists: T_Specialist[]
}

const initialState:T_SpecialistsSlice = {
    specialist_name: "",
    specialist: null,
    specialists: []
}

export const fetchSpecialist = createAsyncThunk<T_Specialist, string, AsyncThunkConfig>(
    "fetch_specialist",
    async function(id) {
        const response = await api.specialists.specialistsRead(id) as AxiosResponse<T_Specialist>
        return response.data
    }
)

export const fetchSpecialists = createAsyncThunk<T_Specialist[], object, AsyncThunkConfig>(
    "fetch_specialists",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState();
        const response = await api.specialists.specialistsList({
            specialist_name: state.specialists.specialist_name
        }) as AxiosResponse<T_SpecialistsListResponse>

        thunkAPI.dispatch(saveLecture({
            draft_lecture_id: response.data.draft_lecture_id,
            specialists_count: response.data.specialists_count
        }))

        return response.data.specialists
    }
)

export const addSpecialistToLecture = createAsyncThunk<void, string, AsyncThunkConfig>(
    "specialists/add_specialist_to_lecture",
    async function(specialist_id) {
        await api.specialists.specialistsAddToLectureCreate(specialist_id)
    }
)

export const deleteSpecialist = createAsyncThunk<T_Specialist[], string, AsyncThunkConfig>(
    "delete_specialist",
    async function(specialist_id) {
        const response = await api.specialists.specialistsDeleteDelete(specialist_id) as AxiosResponse<T_Specialist[]>
        return response.data
    }
)

export const updateSpecialist = createAsyncThunk<void, object, AsyncThunkConfig>(
    "update_specialist",
    async function({specialist_id, data}) {
        await api.specialists.specialistsUpdateUpdate(specialist_id as string, data as Specialist)
    }
)

export const updateSpecialistImage = createAsyncThunk<void, object, AsyncThunkConfig>(
    "update_specialist_image",
    async function({specialist_id, data}) {
        await api.specialists.specialistsUpdateImageCreate(specialist_id as string, data as {image?: File})
    }
)

export const createSpecialist = createAsyncThunk<void, T_SpecialistAddData, AsyncThunkConfig>(
    "update_specialist",
    async function(data) {
        await api.specialists.specialistsCreateCreate(data)
    }
)

const specialistsSlice = createSlice({
    name: 'specialists',
    initialState: initialState,
    reducers: {
        updateSpecialistName: (state, action) => {
            state.specialist_name = action.payload
        },
        removeSelectedSpecialist: (state) => {
            state.specialist = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSpecialists.fulfilled, (state:T_SpecialistsSlice, action: PayloadAction<T_Specialist[]>) => {
            state.specialists = action.payload
        });
        builder.addCase(fetchSpecialist.fulfilled, (state:T_SpecialistsSlice, action: PayloadAction<T_Specialist>) => {
            state.specialist = action.payload
        });
        builder.addCase(deleteSpecialist.fulfilled, (state:T_SpecialistsSlice, action: PayloadAction<T_Specialist[]>) => {
            state.specialists = action.payload
        });
    }
})

export const { updateSpecialistName, removeSelectedSpecialist} = specialistsSlice.actions;

export default specialistsSlice.reducer