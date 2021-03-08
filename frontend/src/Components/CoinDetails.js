import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './CoinDetails.css'
import {currencies} from './Currencies'
import ApexChart from './ApexChart'
import Search from './Search'

function CoinDetails() {

    const[currency, setCurrency] = useState('usd')
    const[price, setPrice] = useState('')

    useEffect(() => {
        getPrice()
    }, [])

    const getPrice = async() => {
        const data = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,inr,pkr,eur,aed,aud,cad,jpy,nzd,rub`)
        
        let currencyPrice = ''
        if(currency === 'usd') {
            currencyPrice = data.data.bitcoin.usd
            setPrice(currencyPrice)
        } else if(currency === 'inr') {
            currencyPrice = data.data.bitcoin.inr
            setPrice(currencyPrice)
        } else if(currency === 'pkr') {
            currencyPrice = data.data.bitcoin.pkr
            setPrice(currencyPrice)
        } else if(currency === 'eur') {
            currencyPrice = data.data.bitcoin.eur
            setPrice(currencyPrice)
        } else if(currency === 'aed') {
            currencyPrice = data.data.bitcoin.aed
            setPrice(currencyPrice)
        } else if(currency === 'aud') {
            currencyPrice = data.data.bitcoin.aud
            setPrice(currencyPrice)
        } else if(currency === 'cad') {
            currencyPrice = data.data.bitcoin.cad
            setPrice(currencyPrice)
        } else if(currency === 'jpy') {
            currencyPrice = data.data.bitcoin.jpy
            setPrice(currencyPrice)
        } else if(currency === 'nzd') {
            currencyPrice = data.data.bitcoin.nzd
            setPrice(currencyPrice)
        } else if(currency === 'rub') {
            currencyPrice = data.data.bitcoin.rub
            setPrice(currencyPrice)
        } else {
            return currencyPrice
        }
        console.log(currencyPrice)
        console.log(data.data.bitcoin)
    }

    const handleChange = (e) => {
        setCurrency(e.target.value)
        console.log(e.target.value)
    }

    return (
        <div className='container'>
            <a href='watchlist'><button id='button' className='btn' type="button">WatchList</button></a>
            <div className='row'>
                <div className='col-lg-8'>
                    <div style={{'paddingTop':'15px'}} className='cart-row'>
                        <h3>Bitcoin(BTC)</h3>
                        <select id='select' value={currency} onClick={()=>getPrice()} onChange={handleChange}>
                            {
                                currencies.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))
                            }
                        </select>
                        <h3 id='price' >{`${currency.toUpperCase()} ${price}`}</h3>
                    </div>
                </div>
                <div id='search-bar' className='col-lg-4'>
                    <Search />
                </div>
                <div className='col-lg-8'>
                    <div className='col-lg-12' id='alignment'>
                        <ApexChart currency={currency} />
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default CoinDetails
