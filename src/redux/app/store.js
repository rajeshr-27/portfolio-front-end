import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlice";

const store = configureStore({
    reducer:{
        users:loginReducer
    }
})

export default store;