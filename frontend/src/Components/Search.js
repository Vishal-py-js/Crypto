import React, {useState, useEffect} from 'react'
import './Search.css'
import {connect} from 'react-redux'
import {fetchCoins} from '../redux/Action'


function Search({coinData, fetchCoins}) {

    const[query, setQuery] = useState('')
    const[searchvalue, setSearchvalue] = useState(false)
    const[coinId, setCoinId] = useState('')
    const[checked, setChecked] = useState(false)

    useEffect(() => {
        fetchCoins()
        
    }, [])

    // console.log(coinData.coins)

    let coinNames = []
    coinData.map(coin => {
        let slicedName = coin.name.toLowerCase()
        coinNames.push({'id':coin.id, 'name':slicedName, 'value': false})
    })
    console.log(coinNames)

    let filteredArray = coinNames.filter(function(str) {return str.name.includes(query)})
    console.log(filteredArray)

    const handleChange = (e) => {
        setQuery(e.target.value)
        console.log(e.target.value)
    }

    const handleCoinId = (coin) => {
        setCoinId(coin.id)
        localStorage.setItem('coinId', coin.id)
        console.log(coinId)
    }

    const handleClick = (item) => {
        item.value = !item.value
    }

    // const handleClick = (item) => {
    //     setChecked(!item.value)
    // }

    
    const handlechangecheck = (item) => {
        if(item.value == true) {
            localStorage.setItem('WatchList', JSON.stringify(item))
            alert(`${item.name} has been added to your watchlist`)
        } else {
            localStorage.removeItem('WatchList')
            alert(`${item.name} has been removed from your watchlist`)
        }
        console.log(item)
    }

    
    return (
        <div className='container-fluid'>
            <div id='search' className='row'>
                <form id='form' className='form-inline'>
                    <input  className='form-control' onClick={() => setSearchvalue(true)} value={query} placeholder="Search for..." onChange={(e)=>handleChange(e)}/>
                    <button className='btn btn-info'>Search</button>
                </form>
                {
                    searchvalue && query.length != 0 ?<div id="results" >
                        {
                            filteredArray.map(item => (
                                <ul id='list'>
                                    <a><li onClick={() => handleCoinId(item)} key={item.id}>{item.name}</li></a>
                                    
                                    <input type='checkbox' id='ptag' name='check' checked={item.value} onClick={()=>handleClick(item)} onChange={()=>handlechangecheck(item)} />
                                    {/* <ToggleButton value='check' selected={checked} onChange={()=>{setChecked(!checked)}} /> */}
                                </ul>
                            ))
                        }
                    </div>: ''
                }
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
 
export default connect(mapStateToProps, mapDispatchToProps)(Search)
