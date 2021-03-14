import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchCoins} from '../redux/Action'
import axios from 'axios'
import './CoinDetails.css'
import {cryptoCurrencies} from './Currencies'
import ApexChart from './ApexChart'
import Search from './Search'

function CoinDetails({coinData, fetchCoins}) {

    const[price, setPrice] = useState('')
    const[crypto, setCrypto] = useState('bitcoin')

    useEffect(() => {
        fetchCoins()
        getPrice()
    }, [])

    const getPrice = async() => {
        const data = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`)
        console.log(data.data)
        let currencyPrice = ''
        if(crypto === 'bitcoin') {
            currencyPrice = await data.data.bitcoin.usd
            setPrice(currencyPrice)
        } else if(crypto === 'ethereum') {
            currencyPrice = await data.data.ethereum.usd
            setPrice(currencyPrice)
        } else if(crypto === 'dogecoin') {
            currencyPrice = await data.data.dogecoin.usd
            setPrice(currencyPrice)
        } else if(crypto === 'litecoin') {
            currencyPrice = await data.data.litecoin.usd
            setPrice(currencyPrice) 
        } else if(crypto === 'cardano') {
            currencyPrice = await data.data.cardano.usd
            setPrice(currencyPrice) 
        } else {
            return currencyPrice
        }
        console.log(currencyPrice)
        console.log(data.data.bitcoin)
    }

    console.log(coinData)


    const handleCryptoChange = (e) => {
        setCrypto(e.target.value)
        console.log(e.target.value)
    }

    console.log(crypto)

    return (
        <div className='container'>
            <a href='watchlist'><button id='button' className='btn' type="button">WatchList</button></a>
            <div className='row'>
                <div className='col-lg-8'>
                    <div style={{'paddingTop':'15px'}} className='cart-row'>
                        <h4>{crypto.charAt(0).toUpperCase()+crypto.slice(1)}</h4>
                        <select id='select' value={crypto} onClick={()=>getPrice()} onChange={handleCryptoChange} >
                            {
                                cryptoCurrencies.map((coin) => (
                                    <option key={coin.label} value={coin.value}>{coin.label}</option>
                                ))
                            }
                        </select>
                        <h4 id='price' >{`USD ${price}`}</h4>
                    </div>
                </div>
                <div id='search-bar' className='col-lg-4'>
                    <Search />
                </div>
                <div className='col-lg-12'>
                    <div id='alignment'>
                        <ApexChart crypto={crypto} />
                    </div>
                </div>
            </div>
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        coinData: state.coins.coins
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCoins: () => dispatch(fetchCoins())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(CoinDetails)
