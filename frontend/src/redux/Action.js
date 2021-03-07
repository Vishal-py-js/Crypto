import {FETCH_COINS, FETCH_COIN_DETAILS, FETCH_COIN_DETAILS_SUCCESS, FETCH_COIN_DETAILS_FAILURE} from './ActionTypes'
import axios from 'axios'


export const fetch_coins = coins => {
    return {
        type: FETCH_COINS,
        payload: coins
    }
}

export const fetchcoindetails = () => {
    return {
        type: FETCH_COIN_DETAILS,
    }
}

export const fetchCoinDetailsSuccess = details => {
    return {
        type: FETCH_COIN_DETAILS_SUCCESS,
        payload: details
    }
}

export const fetchCoinDetailsFailure = error => {
    return {
        type: FETCH_COIN_DETAILS_FAILURE,
        payload: error
    }
}

export const fetchCoins = () => {
    return (dispatch) => {
        axios.get('https://api.coingecko.com/api/v3/coins/list')
        .then((response => {
            const coins = response.data
            dispatch(fetch_coins(coins))
        }))
    }
}

export const fetchdetails = () => {
    return (dispatch) => {
        dispatch(fetchcoindetails)
        axios.get(`https://api.coingecko.com/api/v3/coins/${localStorage.getItem('coinId')}`)
        .then(response => {
            const details = response.data
        dispatch(fetchCoinDetailsSuccess(details))
        })
        .catch(error => {
            const errorMsg = error.message
            dispatch(fetchCoinDetailsFailure(errorMsg))
        })
    }
}

