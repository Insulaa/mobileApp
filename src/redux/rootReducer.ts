import { combineReducers } from "@reduxjs/toolkit";
import { reducer as glucoseStore } from "./glucoseStore";


const rootReducer = combineReducers({
    glucoseStore
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
