import {AppState} from '../reducers';
import {Client} from './reducer';

export const getClientStateBranch = (state: AppState) => state.client

export const getClientForm = (state: AppState) => getClientStateBranch(state).form

export const getAllClients = (state: AppState) => {
  const arr: Client[] = [];
  Object.keys(getClientStateBranch(state).list)
    .map((key) => getClientStateBranch(state).list[key])
    .map((x) => arr.push(x));
  return arr;
}
