import {combineReducers} from '@reduxjs/toolkit';
import {reducer as userStore} from './userStore';

const rootReducer = combineReducers({
  userStore,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
