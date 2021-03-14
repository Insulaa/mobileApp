import { combineReducers } from "@reduxjs/toolkit";
import { reducer as glucoseStore } from "./glucoseStore";
import { reducer as medicationStore } from "./medicationStore";
import { reducer as userMedicationStore } from "./userMedicationStore";



const rootReducer = combineReducers({
    glucoseStore,
    medicationStore,
    userMedicationStore
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
