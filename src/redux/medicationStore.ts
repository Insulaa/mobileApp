import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import MedicationService, { MedicationMasterData } from '../api/medicationService'

export type MedicationMasterDataState = {
    medications: MedicationMasterData[];
    isLoading: boolean;
    error: string | null;
}

export type Medication = {
    id: number;
    name: string;
}

export type MedicationDataState = {
    medications: Medication[];
    isLoading: boolean;
    error: string | null;
}

const medicationMasterDataInititalState: MedicationDataState = {
    medications: [],
    isLoading: false,
    error: null
}

const medicationSlice = createSlice({
    name: "medicationStore",
    initialState: medicationMasterDataInititalState,
    reducers: {
        doSetMedicationMasterDataFetchInProgress(state: MedicationDataState){
            state.isLoading = true;
            state.error = null;
        },
        doSetMedicationMasterData(state: MedicationDataState, { payload }: PayloadAction<MedicationMasterData[]>){
            payload.map((med) => {
                const medication = {
                    id: med.medication_id,
                    name: med.medication_name
                };
                state.medications = [...state.medications, medication];
            }) 
            state.isLoading = false;
            state.error = null;
        },
        doSetMedicationMasterDataFetchError(state: MedicationDataState, { payload }: PayloadAction<string>){
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