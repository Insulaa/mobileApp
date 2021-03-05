import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import GlucoseService, { GlucoseReading } from '../api/glucoseService'

export type GlucoseEditInfo = {
    isEdit: boolean;
    glucoseReadingId: number;
}

export type GlucoseReadingsState = {
    readings: GlucoseReading[];
    glucoseEditInfo: GlucoseEditInfo;
    isLoading: boolean;
    error: string | null;
}

const glucoseReadingsIntitalState: GlucoseReadingsState = {
    readings: [],
    glucoseEditInfo: {
        isEdit: false,
        glucoseReadingId: -1
    },
    isLoading: false,
    error: null
}



const glucoseSlice = createSlice({
    name: "glucoseStore",
    initialState: glucoseReadingsIntitalState,
    reducers: {
        doSetGlucoseActionInProgress(state: GlucoseReadingsState){
            state.isLoading = true;
            state.error = null;
        },
        doSetGlucoseReadings(state: GlucoseReadingsState, { payload }: PayloadAction<GlucoseReading[]>) {
            state.readings = payload;
            state.isLoading = false;
            state.error = null;
        },
        doSetGlucoseActionError(state: GlucoseReadingsState, { payload }: PayloadAction<string>) {
            state.isLoading = false;
            state.error = payload;
        },
        doAddGlucoseReading(state: GlucoseReadingsState, {payload}: PayloadAction<GlucoseReading>) {
            state.readings = [...state.readings, payload];
            state.isLoading = false;
            state.error = null;
        },
        doUpdateGlucoseReading(state: GlucoseReadingsState, {payload}: PayloadAction<GlucoseReading>){
            state.readings.map((reading) => {
                if (reading.id === payload.id) {
                    reading.glucose_reading = payload.glucose_reading;
                }
            });
            state.isLoading = false;
            state.error = null;
        },
        doSetIsGlucoseInEdit(state: GlucoseReadingsState, { payload }: PayloadAction<GlucoseEditInfo>) {
            state.glucoseEditInfo.isEdit = payload.isEdit;
            state.glucoseEditInfo.glucoseReadingId = payload.glucoseReadingId;
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
        dispatch(glucoseActionsCreators.doSetGlucoseActionInProgress());
        const allReadings = await glucoseService.getGlucoseReadings({patientId});
        if (allReadings) {
            dispatch(glucoseActionsCreators.doSetGlucoseReadings(allReadings));
        }
    }
    catch (error) {
        dispatch(glucoseActionsCreators.doSetGlucoseActionError(error.toString()));
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
        dispatch(glucoseActionsCreators.doSetGlucoseActionInProgress());
        const reading = await glucoseService.addGlucoseReading({patientId, glucoseLevel});
        if (reading) {
            dispatch(glucoseActionsCreators.doAddGlucoseReading(reading));
        }
    } catch (error) {
        dispatch(glucoseActionsCreators.doSetGlucoseActionError(error.toString()));
    }
}

const doUpdateGlucoseReadingAsync = (props: {
    patientId: number;
    glucoseLevel: number;
    readingId: number;
    glucoseService: GlucoseService;
}) : AppThunk => async (dispatch) => {
    const {
        patientId, glucoseLevel, readingId, glucoseService
    } = props;
    try {
        dispatch(glucoseActionsCreators.doSetGlucoseActionInProgress());
        const reading = await glucoseService.updateGlucoseReading({patientId, glucoseLevel, readingId});
        if (reading) {
            dispatch(glucoseActionsCreators.doUpdateGlucoseReading(reading));
        }
    } catch (error) {
        dispatch(glucoseActionsCreators.doSetGlucoseActionError(error.toString()));
    }
}

const doSetGlucoseInputStatusAsync = (props: {
    glucoseEditInfo: GlucoseEditInfo;
}) : AppThunk => async (dispatch) => {
    const {glucoseEditInfo} = props;
    try {
        dispatch(glucoseActionsCreators.doSetGlucoseActionInProgress());
        dispatch(glucoseActionsCreators.doSetIsGlucoseInEdit(glucoseEditInfo));
    } catch (error) {
        dispatch(glucoseActionsCreators.doSetGlucoseActionError(error.toString()));
    }
}

export const { reducer } = glucoseSlice;
export const actions = {
    doSetGlucoseReadingsFetchInProgress: glucoseActionsCreators.doSetGlucoseActionInProgress,
    doSetGlucoseReadings: glucoseActionsCreators.doSetGlucoseReadings,
    deSetGlucoseFetchError: glucoseActionsCreators.doSetGlucoseActionError,
    doAddGlucoseReading: glucoseActionsCreators.doAddGlucoseReading,
    doUpdateGlucoseReading: glucoseActionsCreators.doUpdateGlucoseReading,
    doSetIsGlucoseInEdit: glucoseActionsCreators.doSetIsGlucoseInEdit,
  doFetchGlucoseReadingsAsync,
  doAddGlucoseReadingAsync,
  doUpdateGlucoseReadingAsync,
  doSetGlucoseInputStatusAsync
}