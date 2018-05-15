export const USERS_API_CALL_REQUEST = 'USERS_API_CALL_REQUEST';
export const USERS_API_CALL_SUCCESS = 'USERS_API_CALL_SUCCESS';
export const USERS_API_CALL_FAILURE = 'USERS_API_CALL_FAILURE';

export interface User {
  id: string;
  username: string;
  role: string;
}

export interface UsersState {
  list: {
    [key: string]: User
  };
  fetching: boolean;
  error: string;
}

const initialState: UsersState = {
  list: {},
  fetching: true,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_API_CALL_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      };
    case USERS_API_CALL_SUCCESS:
      const newList = {};

      action.payload.users.forEach((element) => {
        newList[element.id] = {...element};
      });

      return {
        ...state,
        list: newList,
        fetching: false,
        error: null
      };
    case USERS_API_CALL_FAILURE:
      return {
        ...state,
        list: {},
        fetching: false,
        error: action.error
      };
    default:
      return state;
  }
};
