import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import GlucoseService, { GlucoseReading } from '../api/glucoseService'

export type GlucoseReadingsState = {
    readings: GlucoseReading[];
    isLoading: boolean;
    error: string | null;
}

const glucoseReadingsIntitalState: GlucoseReadingsState = {
    readings: [],
    isLoading: false,
    error: null
}

const glucoseSlice = createSlice({
    name: "glucoseStore",
    initialState: glucoseReadingsIntitalState,
    reducers: {
        doSetGlucoseReadingsFetchInProgress(state: GlucoseReadingsState){
            state.isLoading = true;
            state.error = null;
        },
        doSetGlucoseReadings(state: GlucoseReadingsState, { payload }: PayloadAction<GlucoseReading[]>) {
            state.readings = payload;
            state.isLoading = false;
            state.error = null;
        },
        deSetGlucoseFetchError(state: GlucoseReadingsState, { payload }: PayloadAction<string>) {
            state.isLoading = false;
            state.error = payload;
        },
        doAddGlucoseReading(state: GlucoseReadingsState, {payload}: PayloadAction<GlucoseReading>) {
            state.readings = [...state.readings, payload];
            state.isLoading = false;
            state.error = null;
        }
    }
})

const glucoseActionsCreators = glucoseSlice.actions;

const doFetchGlucoseReadingsAsync = (props: {
    patientId: number;
    glucoseService: GlucoseService;
}): AppThunk => async (dispatch) => {
    const {patientId, glucoseService} = props;

    try {
        dispatch(glucoseActionsCreators.doSetGlucoseReadingsFetchInProgress());
        const allReadings = await glucoseService.getGlucoseReadings({patientId});
        if (allReadings) {
            dispatch(glucoseActionsCreators.doSetGlucoseReadings(allReadings));
        }
    }
    catch (error) {
        dispatch(glucoseActionsCreators.deSetGlucoseFetchError(error.toString()));
    }
};

const doAddGlucoseReadingAsync = (props: {
    patientId: number;
    glucoseLevel: number;
    glucoseService: GlucoseService;
}) : AppThunk => async (dispatch) => {
    const {
        patientId, glucoseLevel, glucoseService
    } = props;
    try {
        dispatch(glucoseActionsCreators.doSetGlucoseReadingsFetchInProgress());
        const reading = await glucoseService.addGlucoseReading({patientId, glucoseLevel});
        if (reading) {
            dispatch(glucoseActionsCreators.doAddGlucoseReading(reading));
        }
    } catch (error) {
        dispatch(glucoseActionsCreators.deSetGlucoseFetchError(error.toString()));
    }
}

export const { reducer } = glucoseSlice;
export const actions = {
  doSetGlucoseReadingsFetchInProgress: glucoseActionsCreators.doSetGlucoseReadingsFetchInProgress,
  doSetGlucoseReadings: glucoseActionsCreators.doSetGlucoseReadings,
  deSetGlucoseFetchError: glucoseActionsCreators.deSetGlucoseFetchError,
  doFetchGlucoseReadingsAsync,
  doAddGlucoseReadingAsync
}