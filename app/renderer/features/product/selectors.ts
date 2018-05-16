import {AppState} from '../reducers';
import {Product} from './reducer';

export const getProductStateBranch = (state: AppState) => state.product

export const getProductForm = (state: AppState) => getProductStateBranch(state).form

export const getAllProducts = (state: AppState) => {
  const arr: Product[] = [];
  Object.keys(getProductStateBranch(state).list)
    .map((key) => getProductStateBranch(state).list[key])
    .map((x) => arr.push(x));
  return arr;
}
