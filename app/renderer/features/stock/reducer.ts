import {AnyAction} from 'redux';

export const STOCK_FETCH_ALL_REQUEST = 'STOCK_FETCH_ALL_REQUEST';
export const STOCK_FETCH_ALL_SUCCESS = 'STOCK_FETCH_ALL_SUCCESS';
export const STOCK_FETCH_ALL_FAILURE = 'STOCK_FETCH_ALL_FAILURE';

export const STOCK_FETCH_ONE_REQUEST = 'STOCK_FETCH_ONE_REQUEST';
export const STOCK_FETCH_ONE_SUCCESS = 'STOCK_FETCH_ONE_SUCCESS';
export const STOCK_FETCH_ONE_FAILURE = 'STOCK_FETCH_ONE_FAILURE';

export const STOCK_CREATE_REQUEST = 'STOCK_CREATE_REQUEST';
export const STOCK_CREATE_SUCCESS = 'STOCK_CREATE_SUCCESS';
export const STOCK_CREATE_FAILURE = 'STOCK_CREATE_FAILURE';

export const STOCK_REMOVE_REQUEST = 'STOCK_REMOVE_REQUEST';
export const STOCK_REMOVE_SUCCESS = 'STOCK_REMOVE_SUCCESS';
export const STOCK_REMOVE_FAILURE = 'STOCK_REMOVE_FAILURE';

export const STOCK_UPDATE_REQUEST = 'STOCK_UPDATE_REQUEST';
export const STOCK_UPDATE_SUCCESS = 'STOCK_UPDATE_SUCCESS';
export const STOCK_UPDATE_FAILURE = 'STOCK_UPDATE_FAILURE';

export interface Stock {
  id: string;
  name: string
  length: number
  width: number
  height: number
  description: string
}

export interface StockState {
  list: {
    [key: string]: Stock
  };
  stock: Stock;
  fetching: boolean;
  error: string;
  form: {
    fetching: boolean
    error: string
  }
}

const initialState: StockState = {
  list: {},
  stock: null,
  fetching: true,
  error: null,
  form: {
    fetching: false,
    error: null
  }
};

export default (state = initialState, action: AnyAction): StockState => {
  switch (action.type) {
    case STOCK_FETCH_ALL_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case STOCK_FETCH_ALL_SUCCESS: {
      const newList = {};

      action.payload.stocks.forEach((element) => {
        newList[element.id] = {...element};
      });

      return {
        ...state,
        list: newList,
        fetching: false,
        error: null
      };
    }
    case STOCK_FETCH_ALL_FAILURE:
      return {
        ...state,
        list: {},
        fetching: false,
        error: action.error
      };
    case STOCK_FETCH_ONE_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case STOCK_FETCH_ONE_SUCCESS:
      return {
        ...state,
        stock: action.payload.stock,
        fetching: false,
        error: null
      }
    case STOCK_FETCH_ONE_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    case STOCK_CREATE_REQUEST:
      return {
        ...state,
        form: {
          fetching: true,
          error: null
        }
      }
    case STOCK_CREATE_SUCCESS:
      return {
        ...state,
        form: {
          fetching: false,
          error: null
        }
      }
    case STOCK_CREATE_FAILURE:
      return {
        ...state,
        form: {
          fetching: false,
          error: action.error
        }
      }
    case STOCK_REMOVE_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case STOCK_REMOVE_SUCCESS: {
      const newList = {...state.list}
      delete newList[action.payload.id]

      return {
        ...state,
        fetching: false,
        error: null,
        list: newList
      }
    }
    case STOCK_REMOVE_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    default:
      return state
  }
};
