import {configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import userReducer from "./slices/userSlice.ts"
import lecturesReducer from "./slices/lecturesSlice.ts"
import specialistsReducer from "./slices/specialistsSlice.ts"
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'auth',
    storage,
    whitelist: ['id', "username", "email"]
}

export const store = configureStore({
    reducer: {
        user: persistReducer(persistConfig, userReducer),
        lectures: lecturesReducer,
        specialists: specialistsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppThunkDispatch = ThunkDispatch<RootState, never, never>

export const persister = persistStore(store)

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;