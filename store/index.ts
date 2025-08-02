import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projectSlice";
import chatReducer from "./chatSlice";
import userReducer from "./userSlice";

export const store = configureStore({
    reducer: {
        project: projectReducer,
        chat: chatReducer,
        user: userReducer,
    },
    devTools: process.env.NODE_ENV !== "production", // enables Redux DevTools
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
