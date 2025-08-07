import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from "./features/signupSlice";
import loginReducer from "./features/loginSlice";
import candidateReducer from './features/candidates/personalDetails';

export const store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
    candidate: candidateReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
