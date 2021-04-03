import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from './store';
import UserProfileService, {UserProfileData} from '../api/userProfileService';

export type UserProfileDataState = {
  userInfo: UserProfileData;
  isLoading: boolean;
  error: string | null;
};

const userProfileInititalState: UserProfileDataState = {
  userInfo: {
    id: -1,
    dateOfBirth: '',
    sex: '',
    height1: -1,
    height1_unit: '',
    height2: -1,
    height2_unit: '',
    weight: -1,
    weight_unit: '',
    glucose_lower_limit: -1,
    glucose_upper_limit: -1,
    patient: -1,
  },
  isLoading: false,
  error: null,
};

const userProfileSlice = createSlice({
  name: 'userProfileStore',
  initialState: userProfileInititalState,
  reducers: {
    doSetUserProfileActionInProgress(state: UserProfileDataState) {
      state.isLoading = true;
      state.error = null;
    },
    doSetUserProfile(
      state: UserProfileDataState,
      {payload}: PayloadAction<UserProfileData>,
    ) {
      state.userInfo = payload;
      state.isLoading = false;
      state.error = null;
    },
    doSetUserProfileActionError(
      state: UserProfileDataState,
      {payload}: PayloadAction<string>,
    ) {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

const userProfileActionsCreators = userProfileSlice.actions;

const doFetchUserProfileAsync = (props: {
  patientId: number;
  userProfileService: UserProfileService;
}): AppThunk => async (dispatch) => {
  const {patientId, userProfileService} = props;
  try {
    dispatch(userProfileActionsCreators.doSetUserProfileActionInProgress());
    const reading = await userProfileService.getUserProfileData({patientId});
    if (reading) {
      dispatch(userProfileActionsCreators.doSetUserProfile(reading[0]));
    }
  } catch (error) {
    dispatch(
      userProfileActionsCreators.doSetUserProfileActionError(error.toString()),
    );
  }
};

export const {reducer} = userProfileSlice;
export const actions = {
  doSetUserProfileActionInProgress:
    userProfileActionsCreators.doSetUserProfileActionInProgress,
  doSetUserProfile: userProfileActionsCreators.doSetUserProfile,
  doSetUserProfileActionError:
    userProfileActionsCreators.doSetUserProfileActionError,
  doFetchUserProfileAsync,
};
