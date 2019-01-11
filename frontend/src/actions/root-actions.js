import { handleSocketsOnLogout } from './socket-actions';

export const RESET_APP = 'ROOT::RESET_APP'
export function resetApp() {
  handleSocketsOnLogout()
  return { type: RESET_APP }
}