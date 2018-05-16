import {combineReducers} from 'redux';
import loginReducer, {LoginState} from './login/reducer';
import usersReducer, {UsersState} from './users/reducer';
import employeeReducer, {EmployeeState} from './employee/reducer';
import productReducer, {ProductState} from './product/reducer';
import  stockReducer, {StockState} from './stock/reducer';

export const rootReducer = combineReducers({
  login: loginReducer,
  users: usersReducer,
  employee: employeeReducer,
  product: productReducer,
  stock: stockReducer,
});

export interface AppState {
  login: LoginState;
  users: UsersState;
  employee: EmployeeState;
  product: ProductState;
  stock: StockState;
}
