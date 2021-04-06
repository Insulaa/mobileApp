import UserService, {User} from '../api/userService';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from './store';
import {strictEqual} from 'assert';

export type UserDataState = {
  userData: User;
  isLoading: boolean;
  error: string | null;
};

const userInitialState: UserDataState = {
  userData: {
    user: {
      patient_id: -1,
      password: '',
      last_login: '',
      is_superuser: '',
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      date_joined: '',
      groups: [],
      user_permissions: [],
    },
    token: '',
  },
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'userStore',
  initialState: userInitialState,
  reducers: {
    doSetUserFetchInProgress(state: UserDataState) {
      state.isLoading = true;
      state.error = null;
    },
    doSetUser(state: UserDataState, {payload}: PayloadAction<User>) {
      state.userData = payload;
      state.isLoading = false;
      state.error = null;
    },
    doSetUserActionError(
      state: UserDataState,
      {payload}: PayloadAction<string>,
    ) {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

const userActionsCreators = userSlice.actions;

const doFetchUserAsync = (props: {
  email: string;
  password: string;
  userService: UserService;
}): AppThunk => async (dispatch) => {
  const {email, password, userService} = props;
  try {
    dispatch(userActionsCreators.doSetUserFetchInProgress());
    const reading = await userService.loginUser({email, password});
    if (reading) {
      dispatch(userActionsCreators.doSetUser(reading));
    }
  } catch (error) {
    dispatch(userActionsCreators.doSetUserActionError(error.toString()));
  }
};

export const {reducer} = userSlice;
export const actions = {
  doSetUserActionInProgress: userActionsCreators.doSetUserFetchInProgress,
  doSetUser: userActionsCreators.doSetUser,
  doSetUserActionError: userActionsCreators.doSetUserActionError,
  doFetchUserAsync,
};
