import {AnyAction} from 'redux';

export const PROCESS_FETCH_ALL_REQUEST = 'PROCESS_FETCH_ALL_REQUEST';
export const PROCESS_FETCH_ALL_SUCCESS = 'PROCESS_FETCH_ALL_SUCCESS';
export const PROCESS_FETCH_ALL_FAILURE = 'PROCESS_FETCH_ALL_FAILURE';

export const PROCESS_FETCH_ONE_REQUEST = 'PROCESS_FETCH_ONE_REQUEST';
export const PROCESS_FETCH_ONE_SUCCESS = 'PROCESS_FETCH_ONE_SUCCESS';
export const PROCESS_FETCH_ONE_FAILURE = 'PROCESS_FETCH_ONE_FAILURE';

export const PROCESS_CREATE_REQUEST = 'PROCESS_CREATE_REQUEST';
export const PROCESS_CREATE_SUCCESS = 'PROCESS_CREATE_SUCCESS';
export const PROCESS_CREATE_FAILURE = 'PROCESS_CREATE_FAILURE';

export const PROCESS_REMOVE_REQUEST = 'PROCESS_REMOVE_REQUEST';
export const PROCESS_REMOVE_SUCCESS = 'PROCESS_REMOVE_SUCCESS';
export const PROCESS_REMOVE_FAILURE = 'PROCESS_REMOVE_FAILURE';

export const PROCESS_UPDATE_REQUEST = 'PROCESS_UPDATE_REQUEST';
export const PROCESS_UPDATE_SUCCESS = 'PROCESS_UPDATE_SUCCESS';
export const PROCESS_UPDATE_FAILURE = 'PROCESS_UPDATE_FAILURE';

export const PROCESS_LOAD_ADDITIONAL_DATA_REQUEST = 'PROCESS_LOAD_ADDITIONAL_DATA_REQUEST'
export const PROCESS_LOAD_ADDITIONAL_DATA_SUCCESS = 'PROCESS_LOAD_ADDITIONAL_DATA_SUCCESS'
export const PROCESS_LOAD_ADDITIONAL_DATA_FAILURE = 'PROCESS_LOAD_ADDITIONAL_DATA_FAILURE'

export const PROCESS_FETCH_ALL_SUCCESS_ONE = 'PROCESS_FETCH_ALL_SUCCESS_ONE'

export interface Process {
  id: string;
  product: {
    id: string
    name: string
  }
  stockEnter: {
    id: string
    name: string
  }
  stockExit: {
    id: string
    name: string
  }
  client: {
    id: string
    name: string
  }
  supplier: {
    id: string
    name: string
  }
  count: number
  process: {
    stepType: string
    name: string
  }[]

  loading: boolean
  error: string
}

export interface ProcessState {
  list: {
    [key: string]: Process
  };
  process: Process;
  fetching: boolean;
  error: string;
  form: {
    fetching: boolean
    error: string
    stocks?: {
      id: string
      name: string
    }[]
    clients?: {
      id: string
      name: string
    }[]
    suppliers?: {
      id: string
      name: string
    }[]
    products?: {
      id: string
      name: string
    }
  }
}

const initialState: ProcessState = {
  list: {},
  process: null,
  fetching: true,
  error: null,
  form: {
    fetching: false,
    error: null
  }
};

export default (state = initialState, action: AnyAction): ProcessState => {
  switch (action.type) {
    case PROCESS_FETCH_ALL_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case PROCESS_FETCH_ALL_SUCCESS: {
      const newList = {};

      action.payload.processes.forEach((element) => {
        newList[element.id] = {...element};
      });

      return {
        ...state,
        list: newList,
        fetching: false,
        error: null
      };
    }
    case PROCESS_FETCH_ALL_SUCCESS_ONE: {
      const newList = {...state.list}

      newList[action.payload.id] = {
        ...newList[action.payload.id],
        product: action.payload.product,
        loading: false,
        stockEnter: action.payload.enterStock,
        stockExit: action.payload.exitStock,
        supplier: action.payload.supplier,
        client: action.payload.client
      }

      return {
        ...state,
        list: newList
      }
    }
    case PROCESS_FETCH_ALL_FAILURE:
      return {
        ...state,
        list: {},
        fetching: false,
        error: action.error
      };
    case PROCESS_FETCH_ONE_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case PROCESS_FETCH_ONE_SUCCESS:
      return {
        ...state,
        process: action.payload.process,
        fetching: false,
        error: null
      }
    case PROCESS_FETCH_ONE_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    case PROCESS_CREATE_REQUEST:
      return {
        ...state,
        form: {
          ...state.form,
          fetching: true,
          error: null
        }
      }
    case PROCESS_CREATE_SUCCESS:
      return {
        ...state,
        form: {
          ...state.form,
          fetching: false,
          error: null
        }
      }
    case PROCESS_CREATE_FAILURE:
      return {
        ...state,
        form: {
          ...state.form,
          fetching: false,
          error: action.error
        }
      }
    case PROCESS_REMOVE_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case PROCESS_REMOVE_SUCCESS: {
      const newList = {...state.list}
      delete newList[action.payload.id]

      return {
        ...state,
        fetching: false,
        error: null,
        list: newList
      }
    }
    case PROCESS_REMOVE_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    case PROCESS_LOAD_ADDITIONAL_DATA_REQUEST:
      return {
        ...state,
        form: {
          ...state.form,
          fetching: true,
          error: null
        }
      }
    case PROCESS_LOAD_ADDITIONAL_DATA_SUCCESS:
      return {
        ...state,
        form: {
          ...state.form,
          clients: action.payload.clients,
          stocks: action.payload.stocks,
          suppliers: action.payload.suppliers,
          products: action.payload.products,
          fetching: false,
          error: null
        }
      }
    default:
      return state
  }
};
