import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import userReducer from "./features/candidates/signupSlice";
import loginReducer from "./features/candidates/loginSlice";
import candidateReducer from './features/candidates/personalDetails';
import socialReducer from './features/candidates/socialLinks';
import passwordReducer from './features/candidates/passwordSlice';
import candidateProfileReducer from './features/candidates/profileDetails';
import employerSignupReducer from './features/employers/signupSlice';
import employerLoginReducer from "./features/employers/loginSlice";
import employerDetailsReducer from './features/employers/employerDetails';
import employerProfileReducer from './features/employers/employerProfile';

export const store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
    candidate: candidateReducer,
    candidateSocial: socialReducer,
    candidatePassword: passwordReducer,
    candidateProfile: candidateProfileReducer,
    employerSignup: employerSignupReducer,
    employerLogin: employerLoginReducer,
    employerDetails: employerDetailsReducer,
    employerProfile: employerProfileReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
