import { combineReducers } from "@reduxjs/toolkit";
import { reducer as glucoseStore } from "./glucoseStore";
import { reducer as medicationStore } from "./medicationStore";


const rootReducer = combineReducers({
    glucoseStore,
    medicationStore
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
