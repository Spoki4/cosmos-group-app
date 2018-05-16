import {AppState} from '../reducers';
import {Process} from './reducer';

export const getProcessStateBranch = (state: AppState) => state.process

export const getProcessForm = (state: AppState) => getProcessStateBranch(state).form

export const getAllProcesses = (state: AppState) => {
  const arr: Process[] = [];
  Object.keys(getProcessStateBranch(state).list)
    .map((key) => getProcessStateBranch(state).list[key])
    .map((x) => arr.push(x));
  return arr;
}
