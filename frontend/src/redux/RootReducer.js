import coinReducer from './ActionReducer'
import detailsReducer from './DetailsReducer'
import {combineReducers, CombineReducers} from 'redux'

const rootReducer = combineReducers({
    coins: coinReducer,
    details: detailsReducer
})

export default rootReducer