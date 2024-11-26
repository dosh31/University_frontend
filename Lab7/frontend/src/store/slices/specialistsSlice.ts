import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Specialist, T_SpecialistsListResponse} from "src/utils/types.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {saveLecture} from "store/slices/lecturesSlice.ts";
import {api} from "modules/api.ts";
import {AxiosResponse} from "axios";

type T_SpecialistsSlice = {
    specialist_name: string
    selectedSpecialist: null | T_Specialist
    specialists: T_Specialist[]
}

const initialState:T_SpecialistsSlice = {
    specialist_name: "",
    selectedSpecialist: null,
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
        console.log("addSpecialistToLecture")
        await api.specialists.specialistsAddToLectureCreate(specialist_id)
    }
)

const specialistsSlice = createSlice({
    name: 'specialists',
    initialState: initialState,
    reducers: {
        updateQuery: (state, action) => {
            console.log("updateQuery")
            state.specialist_name = action.payload
        },
        removeSelectedSpecialist: (state) => {
            state.selectedSpecialist = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSpecialists.fulfilled, (state:T_SpecialistsSlice, action: PayloadAction<T_Specialist[]>) => {
            state.specialists = action.payload
        });
        builder.addCase(fetchSpecialist.fulfilled, (state:T_SpecialistsSlice, action: PayloadAction<T_Specialist>) => {
            state.selectedSpecialist = action.payload
        });
    }
})

export const { updateQuery, removeSelectedSpecialist} = specialistsSlice.actions;

export default specialistsSlice.reducer