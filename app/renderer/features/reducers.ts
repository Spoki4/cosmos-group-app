import {combineReducers} from 'redux';
import loginReducer, {LoginState} from './login/reducer';
import usersReducer, {UsersState} from './users/reducer';
import employeeReducer, {EmployeeState} from './employee/reducer';
import productReducer, {ProductState} from './product/reducer';
import stockReducer, {StockState} from './stock/reducer';
import supplierReducer, {SupplierState} from './supplier/reducer';
import clientReducer, {ClientState} from './client/reducer';

export const rootReducer = combineReducers({
  login: loginReducer,
  users: usersReducer,
  employee: employeeReducer,
  product: productReducer,
  stock: stockReducer,
  supplier: supplierReducer,
  client: clientReducer
});

export interface AppState {
  login: LoginState;
  users: UsersState;
  employee: EmployeeState;
  product: ProductState;
  stock: StockState;
  supplier: SupplierState;
  client: ClientState
}
