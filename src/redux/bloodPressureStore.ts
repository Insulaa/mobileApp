import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from './store';
import BloodPressureService, {
  BloodPressureReading,
} from '../api/bloodPressureService';

export type BloodPressureReadingsState = {
  readings: BloodPressureReading[];
  isLoading: boolean;
  error: string | null;
};

const bloodPressureReadingsIntitalState: BloodPressureReadingsState = {
  readings: [],
  isLoading: false,
  error: null,
};

const bloodPressureSlice = createSlice({
  name: 'bloodPressureStore',
  initialState: bloodPressureReadingsIntitalState,
  reducers: {
    doSetBloodPressureActionInProgress(state: BloodPressureReadingsState) {
      state.isLoading = true;
      state.error = null;
    },
    doSetBloodPressureReadings(
      state: BloodPressureReadingsState,
      {payload}: PayloadAction<BloodPressureReading[]>,
    ) {
      state.readings = payload;
      state.isLoading = false;
      state.error = null;
    },
    doSetBloodPressureActionError(
      state: BloodPressureReadingsState,
      {payload}: PayloadAction<string>,
    ) {
      state.isLoading = false;
      state.error = payload;
    },
    doAddBloodPressureReading(
      state: BloodPressureReadingsState,
      {payload}: PayloadAction<BloodPressureReading>,
    ) {
      state.readings = [...state.readings, payload];
      state.isLoading = false;
      state.error = null;
    },
  },
});

const bloodPressureActionsCreators = bloodPressureSlice.actions;

const doFetchBloodPressureReadingsAsync = (props: {
  patientId: number;
  bloodPressureService: BloodPressureService;
}): AppThunk => async (dispatch) => {
  const {patientId, bloodPressureService} = props;

  try {
    dispatch(bloodPressureActionsCreators.doSetBloodPressureActionInProgress());
    const allReadings = await bloodPressureService.getBloodPressureReadings({
      patientId,
    });
    if (allReadings) {
      dispatch(
        bloodPressureActionsCreators.doSetBloodPressureReadings(allReadings),
      );
    }
  } catch (error) {
    dispatch(
      bloodPressureActionsCreators.doSetBloodPressureActionError(
        error.toString(),
      ),
    );
  }
};

const doAddBloodPressureReadingAsync = (props: {
  systolic: number;
  diastolic: number;
  patientId: number;
  bloodPressureService: BloodPressureService;
}): AppThunk => async (dispatch) => {
  const {patientId, systolic, diastolic, bloodPressureService} = props;
  try {
    dispatch(bloodPressureActionsCreators.doSetBloodPressureActionInProgress());
    const reading = await bloodPressureService.addBloodPressureReading({
      systolic,
      diastolic,
      patientId,
    });
    if (reading) {
      dispatch(bloodPressureActionsCreators.doAddBloodPressureReading(reading));
    }
  } catch (error) {
    dispatch(
      bloodPressureActionsCreators.doSetBloodPressureActionError(
        error.toString(),
      ),
    );
  }
};

export const {reducer} = bloodPressureSlice;
export const actions = {
  doSetBloodPressureReadingsFetchInProgress:
    bloodPressureActionsCreators.doSetBloodPressureActionInProgress,
  doSetBloodPressureReadings:
    bloodPressureActionsCreators.doSetBloodPressureReadings,
  deSetBloodPressureFetchError:
    bloodPressureActionsCreators.doSetBloodPressureActionError,
  doAddBloodPressureReading:
    bloodPressureActionsCreators.doAddBloodPressureReading,
  doFetchBloodPressureReadingsAsync,
  doAddBloodPressureReadingAsync,
};
