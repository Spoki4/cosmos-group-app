export const LOGIN_API_CALL_REQUEST = "LOGIN_API_CALL_REQUEST"
export const LOGIN_API_CALL_SUCCESS = "LOGIN_API_CALL_SUCCESS"
export const LOGIN_API_CALL_FAILURE = "LOGIN_API_CALL_FAILURE"
export const LOGOUT = "LOGOUT"

const initialState = {
  fetching: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_API_CALL_REQUEST:
      return { ...state, fetching: true, error: null }
    case LOGIN_API_CALL_SUCCESS:
      return { ...state, fetching: false, error: null }
    case LOGIN_API_CALL_FAILURE:
      return { ...state, fetching: false, error: action.error }
    case LOGOUT:
      return { ...initialState }
    default:
      return state
  }
}
