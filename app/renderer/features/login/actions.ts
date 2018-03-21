import {
  LOGIN_API_CALL_REQUEST,
  LOGIN_API_CALL_SUCCESS,
  LOGIN_API_CALL_FAILURE
} from "./reducer"
import { Api } from "../../service/Api"

export const tryLogin = ({ login, password }) => async dispatch => {
  dispatch({ type: LOGIN_API_CALL_REQUEST })

  try {
    const data = await Api.login({ login, password })

    dispatch({ type: LOGIN_API_CALL_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: LOGIN_API_CALL_FAILURE, error: error.message })
  }
}
