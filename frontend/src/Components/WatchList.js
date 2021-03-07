import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './CoinDetails.css'
import SparkLine from './Sparklines';


function WatchList() {

    useEffect(() => {
        getArticles()
        getCoinDetails()
    }, [])

    const[articles, setArticles] = useState([])
    const[marketdata, setMarketdata] = useState({})
    const[price, setPrice] = useState('')
    const[name, setName] = useState({})
    const[graphData, setGraphData] = useState([])

    const getArticles = async() => {
        const data = await axios.get(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=af4c42a75216498eba2880e8bc4dc17a`)
        const response = data.data.articles.slice(0, 5)
        setArticles(response)
        console.log(response)
    }

    const getCoinDetails = async() => {
        const list = JSON.parse(localStorage.getItem('WatchList'))
        console.log(list)
        const data = await axios.get(`https://api.coingecko.com/api/v3/coins/${list.id}?sparkline=true`)
        console.log(data.data.market_data.current_price.usd)
        setMarketdata(data.data.market_data)
        setPrice(data.data.market_data.current_price)
        setGraphData(data.data.market_data.sparkline_7d.price)
        console.log(data.data.market_data.sparkline_7d.price)
        setName(data.data)
    }

    return (
        <div className='container'>
            <div className='row'>
            <div className='cart-box-element'>
                    <div className='cart-row'>
                    <div style={{flex: 2}}></div>
                        <div style={{flex: 2}}><strong></strong></div>
                        <div style={{flex: 1}}><strong>%day Change</strong></div>
                        <div style={{flex: 1}}><strong>Day change</strong></div>
                        <div style={{flex: 1}}><strong>Price</strong></div>
                    </div>
                    
                    <div className='cart-row' >
                        <div style={{flex: "2"}}>{name.name}</div>
                        <div style={{flex: "2"}}></div>
                        <div style={{flex: "1"}}>{marketdata.price_change_percentage_24h}</div>
                        <div style={{flex: "1"}}>
                            <p className='quantity'>{marketdata.price_change_24h}</p>
                        </div>
                        <div style={{flex: "1"}}>{price.usd}</div>
                        <h3></h3>
                    </div>
                        
                </div>
                
                <div className='col-lg-12'>
                    <h2>News</h2>
                    {
                        articles.map(article => (
                            <div className='news'>
                                <h3>{article.title}</h3>
                                <p>{article.description}</p>
                                
                            </div>
                        ))
                    }
                </div>
            </div>
            <SparkLine graphData={graphData} />
        </div>
    )
}

export default WatchList