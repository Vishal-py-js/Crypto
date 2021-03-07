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

    const coinNames = []
    coinData.map(coin => {
        let slicedName = coin.name.toLowerCase()
        coinNames.push({'id':coin.id, 'name':slicedName})
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

    const handleClick = (checked) => {
        setChecked(!checked)
    }

    
    const handlechangecheck = (checked, item) => {
        if(checked == false) {
            localStorage.setItem('WatchList', JSON.stringify(item))
        } else {
            return
            
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
                                    
                                    <input onClick={()=>handleClick(checked)} onChange={()=>handlechangecheck(checked, item)}  type='checkbox' id='ptag' name='check' checked={checked} />
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
