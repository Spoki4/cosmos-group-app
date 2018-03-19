import createSagaMiddleware from "redux-saga"
import { createStore, applyMiddleware, combineReducers } from "redux"
import loginReducer from "../features/login/reducer"

const reducers = combineReducers({
  loginReducer
})

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(reducers, applyMiddleware(sagaMiddleware))
