import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import specialistsReducer from "./slices/specialistsSlice.ts"

export const store = configureStore({
    reducer: {
        specialists: specialistsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;