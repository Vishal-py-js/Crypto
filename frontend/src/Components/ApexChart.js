import React, {useState, useEffect} from 'react'
import ReactApexChart from 'react-apexcharts'
import axios from 'axios'

const ApexChart = ({currency}) => {

    const[prices, setPrices] = useState([])

    useEffect(() => {
        getPrices()
    }, [currency])

    console.log(currency)
    const getPrices = async() => {
        await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?id=bitcoin&vs_currency=${currency}&days=30`)
        .then(response => {
            setPrices(response.data)
            console.log(response.data)
        })
    }

    const newArray = []
    let i = 0
    while(i<prices.length){
        newArray.push({
            x:new Date(prices[i][0]),
            y:[prices[i][1], prices[i][2], prices[i][3], prices[i][4]]
        })
        i += 1
    }

    const state = {
    
        series: [{
            name: 'candle',
            data: 
                newArray
        }],
        options: {
            chart: {
            height: 350,
            type: 'candlestick',
            },
            title: {
            text: 'Bitcoin Price - Category X-axis',
            align: 'left'
            },
            annotations: {
            xaxis: [
                {
                x: 'Oct 06 14:00',
                borderColor: '#00E396',
                label: {
                    borderColor: '#00E396',
                    style: {
                    fontSize: '12px',
                    color: '#fff',
                    background: '#00E396'
                    },
                    orientation: 'horizontal',
                    offsetY: 7,
                    text: 'Annotation Test'
                }
                }
            ]
            },
            tooltip: {
            enabled: true,
            },
            xaxis: {
            type: 'category',
            labels: {
            //   formatter: function(val) {
            //     return dayjs(val).format('MMM DD HH:mm')
            //   }
            }
            },
            yaxis: {
            tooltip: {
                enabled: true
            }
            }
        },
    };


    return (
        <div id="chart">
            <ReactApexChart options={state.options} series={state.series} type="candlestick" height={350} />
        </div>
      )
}

export default ApexChart