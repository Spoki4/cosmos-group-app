import {AppState} from '../reducers';
import {Stock} from './reducer';

export const getStockStateBranch = (state: AppState) => state.stock

export const getStockForm = (state: AppState) => getStockStateBranch(state).form

export const getAllStocks = (state: AppState) => {
  const arr: Stock[] = [];
  Object.keys(getStockStateBranch(state).list)
    .map((key) => getStockStateBranch(state).list[key])
    .map((x) => arr.push(x));
  return arr;
}
