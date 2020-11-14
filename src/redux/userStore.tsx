import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from './store';
import UserService, {User} from '../api/userService';

export type UserState = User & {
  isLoading: boolean;
  error: string | null;
};

const userInitialState: UserState = {
  user_id: -1,
  first_name: '',
  last_name: '',
  password: '',
  email: '',
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'userStore',
  initialState: userInitialState,
  reducers: {
    doSetUserFetchInProgress(state: UserState) {
      state.isLoading = true;
    },
    doSetUser(state: UserState, {payload}: PayloadAction<User>) {
      state.user_id = payload.user_id;
      state.first_name = payload.first_name;
      state.last_name = payload.last_name;
      state.password = payload.password;
      state.email = payload.email;
      state.isLoading = false;
    },
    doSetUserFetchError(state: UserState, {payload}: PayloadAction<string>) {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

const userActionsCreators = userSlice.actions;

const doFetchUserAsync = (props: {
  userId: number;
  userService: UserService;
  onSuccess?: () => void;
  onError?: () => void;
}): AppThunk => async (dispatch) => {
  const {userId, userService, onSuccess, onError} = props;

  try {
    dispatch(userActionsCreators.doSetUserFetchInProgress());
    const user = await userService.getUser({userId});
    if (user) {
      dispatch(userActionsCreators.doSetUser(user));
      if (onSuccess) {
        onSuccess();
      }
    }
  } catch (err) {
    dispatch(userActionsCreators.doSetUserFetchError(err.toString()));
    if (onError) {
      onError();
    }
  }
};

export const {reducer} = userSlice;
export const actions = {
  doSetUserFetchInProgress: userActionsCreators.doSetUserFetchInProgress,
  doSetUser: userActionsCreators.doSetUser,
  doSetUserFetchError: userActionsCreators.doSetUserFetchError,
};
