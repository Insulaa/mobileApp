import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import MedicationService, { MedicationMasterData } from '../api/medicationService'

export type MedicationMasterDataState = {
    medications: MedicationMasterData["medication_name"][];
    isLoading: boolean;
    error: string | null;
}

const medicationMasterDataInititalState: MedicationMasterDataState = {
    medications: [],
    isLoading: false,
    error: null
}

const medicationSlice = createSlice({
    name: "medicationStore",
    initialState: medicationMasterDataInititalState,
    reducers: {
        doSetMedicationMasterDataFetchInProgress(state: MedicationMasterDataState){
            state.isLoading = true;
            state.error = null;
        },
        doSetMedicationMasterData(state: MedicationMasterDataState, { payload }: PayloadAction<MedicationMasterData[]>){
            payload.map((medication) => {
                state.medications = [...state.medications, medication.medication_name];
            })
            state.isLoading = false;
            state.error = null;
        },
        doSetMedicationMasterDataFetchError(state: MedicationMasterDataState, { payload }: PayloadAction<string>){
            state.isLoading = false;
            state.error = payload;
        }
    }
})

const medicationActionsCreators = medicationSlice.actions;

const doFetchMedicationMasterDataAsync = (props: {
    medicationService: MedicationService
}): AppThunk => async (dispatch) => {
    const { medicationService } = props;

    try {
        dispatch(medicationActionsCreators.doSetMedicationMasterDataFetchInProgress());
        const allMedications = await medicationService.getMasterMedicationList();
        if (allMedications) {
            dispatch(medicationActionsCreators.doSetMedicationMasterData(allMedications));
        }
    }
    catch (error) {
        dispatch(medicationActionsCreators.doSetMedicationMasterDataFetchError(error));
    }
};

export const { reducer } = medicationSlice;
export const actions = {
    doSetMedicationMasterDataFetchInProgress: medicationActionsCreators.doSetMedicationMasterDataFetchInProgress,
    doSetMedicationMasterData: medicationActionsCreators.doSetMedicationMasterData,
    doSetMedicationMasterDataFetchError: medicationActionsCreators.doSetMedicationMasterDataFetchError,
    doFetchMedicationMasterDataAsync,
}