import {combineReducers} from '@reduxjs/toolkit';
import {reducer as glucoseStore} from './glucoseStore';
import {reducer as medicationStore} from './medicationStore';
import {reducer as userMedicationStore} from './userMedicationStore';
import {reducer as userProfileStore} from './userProfileStore';
import {reducer as bloodPressureStore} from './bloodPressureStore';

const rootReducer = combineReducers({
  glucoseStore,
  medicationStore,
  userMedicationStore,
  userProfileStore,
  bloodPressureStore,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
