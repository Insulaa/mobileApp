import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from './store';
import MedicationService, {UserMedication} from '../api/medicationService';

export type UserMedicationCurrentState = {
  userMedications: UserMedication[];
  medicationExpanded: number;
  isLoading: boolean;
  error: string | null;
};

const userMedicationCurrentIntitalState: UserMedicationCurrentState = {
  userMedications: [],
  medicationExpanded: -1,
  isLoading: false,
  error: null,
};

const userMedicationSlice = createSlice({
  name: 'userMedicationStore',
  initialState: userMedicationCurrentIntitalState,
  reducers: {
    doSetUserMedicationsActionInProgress(state: UserMedicationCurrentState) {
      state.isLoading = true;
      state.error = null;
    },
    doSetUserMedications(
      state: UserMedicationCurrentState,
      {payload}: PayloadAction<UserMedication[]>,
    ) {
      state.userMedications = payload;
      state.isLoading = false;
      state.error = null;
    },
    doSetUserMedicationsActionError(
      state: UserMedicationCurrentState,
      {payload}: PayloadAction<string>,
    ) {
      state.isLoading = false;
      state.error = payload;
    },
    doAddUserMedication(
      state: UserMedicationCurrentState,
      {payload}: PayloadAction<UserMedication>,
    ) {
      const medicationEntry = (state.userMedications = [
        ...state.userMedications,
        payload,
      ]);
      state.isLoading = false;
      state.error = null;
    },
    doSetMedicationToExpand(
      state: UserMedicationCurrentState,
      {payload}: PayloadAction<number>,
    ) {
      state.medicationExpanded = payload;
      state.isLoading = false;
    },
  },
});

const userMedicationActionsCreators = userMedicationSlice.actions;

const doFetchUserCurrentMedicationsAsync = (props: {
  patientId: number;
  medicationService: MedicationService;
}): AppThunk => async (dispatch) => {
  const {patientId, medicationService} = props;
  try {
    dispatch(
      userMedicationActionsCreators.doSetUserMedicationsActionInProgress(),
    );
    const reading = await medicationService.getUserMedicationsCurrent({
      patientId,
    });
    if (reading) {
      dispatch(userMedicationActionsCreators.doSetUserMedications(reading));
    }
  } catch (error) {
    dispatch(
      userMedicationActionsCreators.doSetUserMedicationsActionError(
        error.toString(),
      ),
    );
  }
};

const doAddUserCurrentMedicationAsync = (props: {
  patientId: number;
  medication: number;
  image: string | null;
  dosage: number;
  unit: string;
  frequency: number;
  frequencyPeriod: string;
  isCurrent: boolean;
  startDate: string;
  endDate: string | null;
  medicationService: MedicationService;
}): AppThunk => async (dispatch) => {
  const {
    patientId,
    medication,
    image,
    dosage,
    unit,
    frequency,
    frequencyPeriod,
    isCurrent,
    startDate,
    endDate,
    medicationService,
  } = props;
  try {
    dispatch(
      userMedicationActionsCreators.doSetUserMedicationsActionInProgress(),
    );
    const reading = await medicationService.addUserMedication({
      patientId,
      medication,
      image,
      dosage,
      unit,
      frequency,
      frequencyPeriod,
      isCurrent,
      startDate,
      endDate,
    });
    if (reading) {
      const medicationsUpdated = await medicationService.getUserMedicationsCurrent(
        {patientId},
      );
      if (medicationsUpdated) {
        dispatch(
          userMedicationActionsCreators.doSetUserMedications(
            medicationsUpdated,
          ),
        );
      }
    }
  } catch (error) {
    dispatch(
      userMedicationActionsCreators.doSetUserMedicationsActionError(error),
    );
  }
};

export const {reducer} = userMedicationSlice;
export const actions = {
  doSetUserMedicationsFetchInProgress:
    userMedicationActionsCreators.doSetUserMedicationsActionInProgress,
  doSetUserMedications: userMedicationActionsCreators.doSetUserMedications,
  doSetUserMedicationsFetchError:
    userMedicationActionsCreators.doSetUserMedicationsActionError,
  doAddUserMedication: userMedicationActionsCreators.doAddUserMedication,
  doSetMedicationToExpand:
    userMedicationActionsCreators.doSetMedicationToExpand,
  doFetchUserCurrentMedicationsAsync,
  doAddUserCurrentMedicationAsync,
};
