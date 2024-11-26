import {createSlice} from "@reduxjs/toolkit";

type T_SpecialistsSlice = {
    specialist_name: string
}

const initialState:T_SpecialistsSlice = {
    specialist_name: "",
}


const specialistsSlice = createSlice({
    name: 'specialists',
    initialState: initialState,
    reducers: {
        updateSpecialistName: (state, action) => {
            state.specialist_name = action.payload
        }
    }
})

export const { updateSpecialistName} = specialistsSlice.actions;

export default specialistsSlice.reducer