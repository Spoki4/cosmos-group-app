import {AppState} from '../reducers';
import {Employee} from './reducer';

export const getEmployeeStateBranch = (state: AppState) => state.employee

export const getEmployeeForm = (state: AppState) => getEmployeeStateBranch(state).form

export const getAllEmployees = (state: AppState) => {
  const arr: Employee[] = [];
  Object.keys(getEmployeeStateBranch(state).list)
    .map((key) => getEmployeeStateBranch(state).list[key])
    .map((x) => arr.push(x));
  return arr;
}
