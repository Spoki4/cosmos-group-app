import {AnyAction} from 'redux';

export const SUPPLIER_FETCH_ALL_REQUEST = 'SUPPLIER_FETCH_ALL_REQUEST';
export const SUPPLIER_FETCH_ALL_SUCCESS = 'SUPPLIER_FETCH_ALL_SUCCESS';
export const SUPPLIER_FETCH_ALL_FAILURE = 'SUPPLIER_FETCH_ALL_FAILURE';

export const SUPPLIER_FETCH_ONE_REQUEST = 'SUPPLIER_FETCH_ONE_REQUEST';
export const SUPPLIER_FETCH_ONE_SUCCESS = 'SUPPLIER_FETCH_ONE_SUCCESS';
export const SUPPLIER_FETCH_ONE_FAILURE = 'SUPPLIER_FETCH_ONE_FAILURE';

export const SUPPLIER_CREATE_REQUEST = 'SUPPLIER_CREATE_REQUEST';
export const SUPPLIER_CREATE_SUCCESS = 'SUPPLIER_CREATE_SUCCESS';
export const SUPPLIER_CREATE_FAILURE = 'SUPPLIER_CREATE_FAILURE';

export const SUPPLIER_REMOVE_REQUEST = 'SUPPLIER_REMOVE_REQUEST';
export const SUPPLIER_REMOVE_SUCCESS = 'SUPPLIER_REMOVE_SUCCESS';
export const SUPPLIER_REMOVE_FAILURE = 'SUPPLIER_REMOVE_FAILURE';

export const SUPPLIER_UPDATE_REQUEST = 'SUPPLIER_UPDATE_REQUEST';
export const SUPPLIER_UPDATE_SUCCESS = 'SUPPLIER_UPDATE_SUCCESS';
export const SUPPLIER_UPDATE_FAILURE = 'SUPPLIER_UPDATE_FAILURE';

export interface Supplier {
  id: string;
  name: string
  length: number
  width: number
  height: number
  description: string
}

export interface SupplierState {
  list: {
    [key: string]: Supplier
  };
  supplier: Supplier;
  fetching: boolean;
  error: string;
  form: {
    fetching: boolean
    error: string
  }
}

const initialState: SupplierState = {
  list: {},
  supplier: null,
  fetching: true,
  error: null,
  form: {
    fetching: false,
    error: null
  }
};

export default (state = initialState, action: AnyAction): SupplierState => {
  switch (action.type) {
    case SUPPLIER_FETCH_ALL_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case SUPPLIER_FETCH_ALL_SUCCESS: {
      const newList = {};

      action.payload.suppliers.forEach((element) => {
        newList[element.id] = {...element};
      });

      return {
        ...state,
        list: newList,
        fetching: false,
        error: null
      };
    }
    case SUPPLIER_FETCH_ALL_FAILURE:
      return {
        ...state,
        list: {},
        fetching: false,
        error: action.error
      };
    case SUPPLIER_FETCH_ONE_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case SUPPLIER_FETCH_ONE_SUCCESS:
      return {
        ...state,
        supplier: action.payload.supplier,
        fetching: false,
        error: null
      }
    case SUPPLIER_FETCH_ONE_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    case SUPPLIER_CREATE_REQUEST:
      return {
        ...state,
        form: {
          fetching: true,
          error: null
        }
      }
    case SUPPLIER_CREATE_SUCCESS:
      return {
        ...state,
        form: {
          fetching: false,
          error: null
        }
      }
    case SUPPLIER_CREATE_FAILURE:
      return {
        ...state,
        form: {
          fetching: false,
          error: action.error
        }
      }
    case SUPPLIER_REMOVE_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case SUPPLIER_REMOVE_SUCCESS: {
      const newList = {...state.list}
      delete newList[action.payload.id]

      return {
        ...state,
        fetching: false,
        error: null,
        list: newList
      }
    }
    case SUPPLIER_REMOVE_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    default:
      return state
  }
};
