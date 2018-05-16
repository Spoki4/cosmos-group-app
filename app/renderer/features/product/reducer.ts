import {AnyAction} from 'redux';

export const PRODUCT_FETCH_ALL_REQUEST = 'PRODUCT_FETCH_ALL_REQUEST';
export const PRODUCT_FETCH_ALL_SUCCESS = 'PRODUCT_FETCH_ALL_SUCCESS';
export const PRODUCT_FETCH_ALL_FAILURE = 'PRODUCT_FETCH_ALL_FAILURE';

export const PRODUCT_FETCH_ONE_REQUEST = 'PRODUCT_FETCH_ONE_REQUEST';
export const PRODUCT_FETCH_ONE_SUCCESS = 'PRODUCT_FETCH_ONE_SUCCESS';
export const PRODUCT_FETCH_ONE_FAILURE = 'PRODUCT_FETCH_ONE_FAILURE';

export const PRODUCT_CREATE_REQUEST = 'PRODUCT_CREATE_REQUEST';
export const PRODUCT_CREATE_SUCCESS = 'PRODUCT_CREATE_SUCCESS';
export const PRODUCT_CREATE_FAILURE = 'PRODUCT_CREATE_FAILURE';

export const PRODUCT_REMOVE_REQUEST = 'PRODUCT_REMOVE_REQUEST';
export const PRODUCT_REMOVE_SUCCESS = 'PRODUCT_REMOVE_SUCCESS';
export const PRODUCT_REMOVE_FAILURE = 'PRODUCT_REMOVE_FAILURE';

export const PRODUCT_UPDATE_REQUEST = 'PRODUCT_UPDATE_REQUEST';
export const PRODUCT_UPDATE_SUCCESS = 'PRODUCT_UPDATE_SUCCESS';
export const PRODUCT_UPDATE_FAILURE = 'PRODUCT_UPDATE_FAILURE';

export interface Product {
  id: string;
  name: string
  length: number
  width: number
  height: number
  description: string
}

export interface ProductState {
  list: {
    [key: string]: Product
  };
  product: Product;
  fetching: boolean;
  error: string;
  form: {
    fetching: boolean
    error: string
  }
}

const initialState: ProductState = {
  list: {},
  product: null,
  fetching: true,
  error: null,
  form: {
    fetching: false,
    error: null
  }
};

export default (state = initialState, action: AnyAction): ProductState => {
  switch (action.type) {
    case PRODUCT_FETCH_ALL_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case PRODUCT_FETCH_ALL_SUCCESS: {
      const newList = {};

      action.payload.products.forEach((element) => {
        newList[element.id] = {...element};
      });

      return {
        ...state,
        list: newList,
        fetching: false,
        error: null
      };
    }
    case PRODUCT_FETCH_ALL_FAILURE:
      return {
        ...state,
        list: {},
        fetching: false,
        error: action.error
      };
    case PRODUCT_FETCH_ONE_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case PRODUCT_FETCH_ONE_SUCCESS:
      return {
        ...state,
        product: action.payload.product,
        fetching: false,
        error: null
      }
    case PRODUCT_FETCH_ONE_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    case PRODUCT_CREATE_REQUEST:
      return {
        ...state,
        form: {
          fetching: true,
          error: null
        }
      }
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        form: {
          fetching: false,
          error: null
        }
      }
    case PRODUCT_CREATE_FAILURE:
      return {
        ...state,
        form: {
          fetching: false,
          error: action.error
        }
      }
    case PRODUCT_REMOVE_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case PRODUCT_REMOVE_SUCCESS: {
      const newList = {...state.list}
      delete newList[action.payload.id]

      return {
        ...state,
        fetching: false,
        error: null,
        list: newList
      }
    }
    case PRODUCT_REMOVE_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    default:
      return state
  }
};
