import axios from 'axios'
import { IAuthHeader } from './header-interfaces'
import { API } from '../../env-config'
import { IStage } from '../stores/model-interfaces'

export default class StageApi {
  // fetchStage = (stid: number, headers: IAuthHeader) =>
  //   axios.get(`${API}/stages/${stid}`, { headers })

  postStage = (sid: number, body: IStage, headers: IAuthHeader) =>
    axios.post(`${API}/sprints/${sid}/stages`, body, { headers })

  putStage = (stid: number, body: IStage, headers: IAuthHeader) =>
    axios.put(`${API}/stages/${stid}`, body, { headers })

  deleteStage = (stid: number, headers: IAuthHeader) =>
    axios.delete(`${API}/stages/${stid}`, { headers })

  switchStagePositions = (stid1: number, stid2: number, headers: IAuthHeader) =>
    axios.patch(`${API}/stages/switchPosition/${stid1}/${stid2}`, { headers })

  moveTask = (
    stid1: number,
    stid2: number,
    tid: number,
    headers: IAuthHeader
  ) =>
    axios.patch(`${API}/stages/${stid1}/${stid2}/moveTask/${tid}`, { headers })
}
