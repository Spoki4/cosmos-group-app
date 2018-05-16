import {AppState} from '../reducers';
import {Supplier} from './reducer';

export const getSupplierStateBranch = (state: AppState) => state.supplier

export const getSupplierForm = (state: AppState) => getSupplierStateBranch(state).form

export const getAllSuppliers = (state: AppState) => {
  const arr: Supplier[] = [];
  Object.keys(getSupplierStateBranch(state).list)
    .map((key) => getSupplierStateBranch(state).list[key])
    .map((x) => arr.push(x));
  return arr;
}
