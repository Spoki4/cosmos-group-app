import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"

import login, { LoginState } from "../features/login/reducer"
import user, { UserState } from "./common/user"

declare const module: any

const rootReducer = combineReducers({
  login,
  user
})

export interface AppState {
  login: LoginState
  user: UserState
}

export default () => {
  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  )

  return store
}
