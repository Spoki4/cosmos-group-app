import { LOGIN_API_CALL_SUCCESS, LOGOUT } from "../../features/login/reducer"

const initialState = {
  login: "",
  token: ""
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_API_CALL_SUCCESS:
      return { ...state, ...action.payload }
    case LOGOUT:
      return { ...initialState }
    default:
      return state
  }
}
