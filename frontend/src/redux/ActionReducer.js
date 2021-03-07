import {FETCH_COINS} from './ActionTypes'

const initialState = {
    coins: []
}

const coinReducer = (state=initialState, action) => {
    switch (action.type) {
        case FETCH_COINS: return {
            ...state,
            coins: action.payload
        }

        default: return state
    }
}

export default coinReducer