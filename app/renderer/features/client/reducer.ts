import {AnyAction} from 'redux';

export const CLIENT_FETCH_ALL_REQUEST = 'CLIENT_FETCH_ALL_REQUEST';
export const CLIENT_FETCH_ALL_SUCCESS = 'CLIENT_FETCH_ALL_SUCCESS';
export const CLIENT_FETCH_ALL_FAILURE = 'CLIENT_FETCH_ALL_FAILURE';

export const CLIENT_FETCH_ONE_REQUEST = 'CLIENT_FETCH_ONE_REQUEST';
export const CLIENT_FETCH_ONE_SUCCESS = 'CLIENT_FETCH_ONE_SUCCESS';
export const CLIENT_FETCH_ONE_FAILURE = 'CLIENT_FETCH_ONE_FAILURE';

export const CLIENT_CREATE_REQUEST = 'CLIENT_CREATE_REQUEST';
export const CLIENT_CREATE_SUCCESS = 'CLIENT_CREATE_SUCCESS';
export const CLIENT_CREATE_FAILURE = 'CLIENT_CREATE_FAILURE';

export const CLIENT_REMOVE_REQUEST = 'CLIENT_REMOVE_REQUEST';
export const CLIENT_REMOVE_SUCCESS = 'CLIENT_REMOVE_SUCCESS';
export const CLIENT_REMOVE_FAILURE = 'CLIENT_REMOVE_FAILURE';

export const CLIENT_UPDATE_REQUEST = 'CLIENT_UPDATE_REQUEST';
export const CLIENT_UPDATE_SUCCESS = 'CLIENT_UPDATE_SUCCESS';
export const CLIENT_UPDATE_FAILURE = 'CLIENT_UPDATE_FAILURE';

export interface Client {
  id: string;
  name: string
  length: number
  width: number
  height: number
  description: string
}

export interface ClientState {
  list: {
    [key: string]: Client
  };
  client: Client;
  fetching: boolean;
  error: string;
  form: {
    fetching: boolean
    error: string
  }
}

const initialState: ClientState = {
  list: {},
  client: null,
  fetching: true,
  error: null,
  form: {
    fetching: false,
    error: null
  }
};

export default (state = initialState, action: AnyAction): ClientState => {
  switch (action.type) {
    case CLIENT_FETCH_ALL_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case CLIENT_FETCH_ALL_SUCCESS: {
      const newList = {};

      action.payload.clients.forEach((element) => {
        newList[element.id] = {...element};
      });

      return {
        ...state,
        list: newList,
        fetching: false,
        error: null
      };
    }
    case CLIENT_FETCH_ALL_FAILURE:
      return {
        ...state,
        list: {},
        fetching: false,
        error: action.error
      };
    case CLIENT_FETCH_ONE_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case CLIENT_FETCH_ONE_SUCCESS:
      return {
        ...state,
        client: action.payload.client,
        fetching: false,
        error: null
      }
    case CLIENT_FETCH_ONE_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    case CLIENT_CREATE_REQUEST:
      return {
        ...state,
        form: {
          fetching: true,
          error: null
        }
      }
    case CLIENT_CREATE_SUCCESS:
      return {
        ...state,
        form: {
          fetching: false,
          error: null
        }
      }
    case CLIENT_CREATE_FAILURE:
      return {
        ...state,
        form: {
          fetching: false,
          error: action.error
        }
      }
    case CLIENT_REMOVE_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case CLIENT_REMOVE_SUCCESS: {
      const newList = {...state.list}
      delete newList[action.payload.id]

      return {
        ...state,
        fetching: false,
        error: null,
        list: newList
      }
    }
    case CLIENT_REMOVE_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    default:
      return state
  }
};
