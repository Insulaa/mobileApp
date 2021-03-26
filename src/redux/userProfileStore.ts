import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import UserProfileService, { UserProfileData } from '../api/userProfileService'

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
       
    }
})

const medicationActionsCreators = medicationSlice.actions;

const doFetchMedicationMasterDataAsync = (props: {
    medicationService: MedicationService
}): AppThunk => async (dispatch) => {
    const { medicationService } = props;

    
};

export const { reducer } = ;
export const actions = 
