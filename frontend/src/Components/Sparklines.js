import React from 'react'
import ReactApexChart from 'react-apexcharts'


const SparkLine = ({graphData}) => {

    const updatedGraphData = []
    graphData.map(data => {
        let newdata = data.toFixed(2)
        updatedGraphData.push(newdata)
    })
    
    //the below function returns an array containing hourly time from the last 7 days
    const dateArray = []
    let datenow = new Date()
    
    let i = 0
    while(i < 168) {
        const date_in_unix = datenow.setHours(datenow.getHours() - 1 )
        const date_in_human = new Date(date_in_unix)
        dateArray.push(date_in_human)
        i += 1
    }
    console.log(dateArray)


    const state = {
    series: [{
        name: "Price",
        data: updatedGraphData
    }],
    options: {
        chart: {
        height: 350,
        type: 'line',
        zoom: {
            enabled: false
        }
        },
        dataLabels: {
        enabled: false
        },
        stroke: {
        curve: 'straight'
        },
        title: {
        text: 'Last 7 days prices(USD)',
        align: 'left'
        },
        grid: {
        row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
        },
        },
        xaxis: {
        categories: dateArray.reverse(),
        }
      },
    };

    

    return (
        <div id="chart">
            <ReactApexChart options={state.options} series={state.series} type="line" height={250} width={250}/>
        </div>
    )
}

export default SparkLine