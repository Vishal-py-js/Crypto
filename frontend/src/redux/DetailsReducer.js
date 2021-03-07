import {FETCH_COIN_DETAILS, FETCH_COIN_DETAILS_SUCCESS, FETCH_COIN_DETAILS_FAILURE} from './ActionTypes'

const initialState = {
    loading: false,
    details: {},
    error: ''
}

const detailsReducer = (state=initialState, action) => {
    switch(action.type) {
        case FETCH_COIN_DETAILS: return {
            ...state,
            loading: true
        }
        case FETCH_COIN_DETAILS_SUCCESS: return {
            loading: false,
            details: [action.payload],
            error: ''
        }
        case FETCH_COIN_DETAILS_FAILURE: return {
            loading: false,
            details: [{}],
            error: action.payload
        }
        default: return state
    }
}

export default detailsReducer