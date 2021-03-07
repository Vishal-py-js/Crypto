import React from 'react'
import ReactApexChart from 'react-apexcharts'


const SparkLine = ({graphData}) => {


    const updatedGraphData = []
    graphData.map(data => {
        let newdata = data.toFixed(2)
        updatedGraphData.push(newdata)
    })
    

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
            text: 'Product Trends by Month',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: ['1d ago', '2d ago', '3d ago', '4d ago', '5d ago', '6d ago', '7d ago'],
          }
        },
      };

      return (
        <div id="chart">
            <ReactApexChart options={state.options} series={state.series} type="line" height={300} width={300}/>
        </div>
      )
}

export default SparkLine