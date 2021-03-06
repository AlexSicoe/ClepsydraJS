import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import { ITaskLog } from '../../stores/model-interfaces'
import ProjectStore from '../../stores/ProjectStore'
import { PromiseState } from '../../util/enums'
import { observer } from 'mobx-react'

interface IProps {
  projectStore: ProjectStore
}

interface IState {}

@observer
export default class ChartFragment extends Component<IProps, IState> {
  state = {}

  handleFetch = () => {
    const { projectStore } = this.props
    projectStore.getTaskLogs()
  }

  componentWillMount() {
    this.handleFetch()
  }

  makeChartData(taskLogs: ITaskLog[]) {
    function mapDataToAxes(taskLogs: ITaskLog[]) {
      const mappedData = taskLogs.map((e) => {
        const o: any = {}
        o.t = e.date
        o.y = e.counter
        return o
      })

      return mappedData
    }

    const data = {
      datasets: [
        {
          label: 'Number of tasks',
          data: mapDataToAxes(taskLogs)
        }
      ]
    }

    const options = {
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
            distribution: 'series'
          }
        ]
      }
    }

    return [data, options]
  }

  render() {
    const { projectStore } = this.props

    if (projectStore.chartState === PromiseState.PENDING) {
      return <div> Loading chart </div>
    }

    console.log('taskLogs')
    console.log(projectStore.taskLogs.toJS())

    const [data, options] = this.makeChartData(projectStore.taskLogs.toJS())

    return (
      <div className="chart">
        {/* 
        //@ts-ignore */}
        <Line data={data} options={options} />
      </div>
    )
  }
}
