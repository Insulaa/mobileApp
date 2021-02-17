import {ADD_GLUCOSE_READING, UPDATE_GLUCOSE_READING} from '../actions/types';

const initialState = {
    glucoseReadingsList: []
}

const glucoseReadingsReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_GLUCOSE_READING:
            return {...state,
            glucoseReadingsList: state.glucoseReadingsList.concat({

            })
            return;
        case UPDATE_GLUCOSE_READING:
            return;
        default:
            return state;
    }
}

export default glucoseReadingsReducer;