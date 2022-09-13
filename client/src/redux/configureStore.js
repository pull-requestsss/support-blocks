import { configureStore, combineReducers } from "@reduxjs/toolkit";
import web3Config from "./web3Slice";
import userDataSlice from "./userDataSlice";

const reducer = combineReducers({
    web3Config: web3Config,
    userConfig: userDataSlice
});

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
});

export default store;