import { USERS_API_CALL_REQUEST, USERS_API_CALL_SUCCESS } from "./reducer"
import { UsersApi } from "./services/users"

export const loadUsersList = () => async dispatch => {
  dispatch({ type: USERS_API_CALL_REQUEST })

  try {
    const data = await UsersApi.getAll()

    dispatch({ type: USERS_API_CALL_SUCCESS, payload: { users: data } })
  } catch (err) {
    dispatch({
      type: USERS_API_CALL_SUCCESS,
      error: "Ошибка при получении данных"
    })
  }
}

export const removeUser = (id: string) => async dispatch => {
  dispatch({ type: USERS_API_CALL_REQUEST })
  try {
    await UsersApi.deleteOne(id)

    const data = await loadUsersList()(dispatch)
  } catch (err) {
    dispatch({
      type: USERS_API_CALL_SUCCESS,
      error: "Ошибка во время удаления"
    })
  }
}
