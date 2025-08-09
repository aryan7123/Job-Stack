import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from "./features/signupSlice";
import loginReducer from "./features/loginSlice";
import candidateReducer from './features/candidates/personalDetails';
import socialReducer from './features/candidates/socialLinks';
import passwordReducer from './features/candidates/passwordSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
    candidate: candidateReducer,
    candidateSocial: socialReducer,
    candidatePassword: passwordReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
