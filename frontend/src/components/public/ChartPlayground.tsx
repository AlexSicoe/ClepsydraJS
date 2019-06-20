import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'

interface IBookkeepData {
  date: string
  counter: number
}

const mockData: IBookkeepData[] = [
  {
    date: '1/1/2019',
    counter: 1
  },
  {
    date: '1/3/2019',
    counter: 2
  },
  {
    date: '2/4/2019',
    counter: 4
  },
  {
    date: '7/5/2019',
    counter: 3
  },
  {
    date: '1/6/2019',
    counter: 5
  }
]

function mapDataToAxes(data: IBookkeepData[]) {
  const mappedData = data.map((e) => {
    const o: any = {}
    o.t = e.date
    o.y = e.counter
    return o
  })

  console.log(mappedData)
  return mappedData
}

export default class ChartPlayground extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {}
  }

  chartData = {
    datasets: [
      {
        label: 'Number of tasks',
        data: mapDataToAxes(mockData)
      }
    ]
  }

  chartOptions = {
    title: {
      display: true,
      text: 'Graph',
      fontSize: 25
    },
    legend: {
      display: true,
      position: 'right'
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          distribution: 'linear'
        }
      ]
    }
  }

  render() {
    return (
      <div className="chart">
        {/* 
        //@ts-ignore */}
        <Line data={this.chartData} options={this.chartOptions} />
      </div>
    )
  }
}
