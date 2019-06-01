import React, { Component } from 'react'
import { Bar, ChartData } from 'react-chartjs-2'

export default class ChartPlayground extends Component<any, any> {
  chartData = {
    labels: ['Boston', 'Worcester', 'SpringField'],
    datasets: [
      {
        label: 'Population',
        data: [123456, 425364, 465364],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)'
        ]
      }
    ]
  }

  constructor(props: any) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="chart">
        <Bar
          data={this.chartData}
          options={{
            title: {
              display: true,
              text: 'Largest Cities in Massachusetts',
              fontSize: 25
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />
      </div>
    )
  }
}
