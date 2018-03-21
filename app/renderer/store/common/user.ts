import { LOGIN_API_CALL_SUCCESS, LOGOUT } from "../../features/login/reducer"

export interface UserState {
  login: string
  permissions: string[]
  token: string
}

const initialState = {
  login: "",
  permissions: [],
  token: ""
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_API_CALL_SUCCESS:
      return { ...state, token: action.payload.token, ...action.payload.user }
    case LOGOUT:
      return { ...initialState }
    default:
      return state
  }
}
