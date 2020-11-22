import {configureStore} from '@reduxjs/toolkit';
import usersReducer from './';

export default configureStore({
  reducer: {
    users: usersReducer,
  },
});
