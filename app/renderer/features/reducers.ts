import { combineReducers } from "redux"
import loginReducer, { LoginState } from "./login/reducer"
import usersReducer, { UsersState } from "./users/reducer"

export const rootReducer = combineReducers({
  login: loginReducer,
  users: usersReducer
})

export interface AppState {
  login: LoginState
  users: UsersState
}
