import {AnyAction} from 'redux';

export const EMPLOYEE_FETCH_ALL_REQUEST = 'EMPLOYEE_FETCH_ALL_REQUEST';
export const EMPLOYEE_FETCH_ALL_SUCCESS = 'EMPLOYEE_FETCH_ALL_SUCCESS';
export const EMPLOYEE_FETCH_ALL_FAILURE = 'EMPLOYEE_FETCH_ALL_FAILURE';

export const EMPLOYEE_FETCH_ONE_REQUEST = 'EMPLOYEE_FETCH_ONE_REQUEST';
export const EMPLOYEE_FETCH_ONE_SUCCESS = 'EMPLOYEE_FETCH_ONE_SUCCESS';
export const EMPLOYEE_FETCH_ONE_FAILURE = 'EMPLOYEE_FETCH_ONE_FAILURE';

export const EMPLOYEE_CREATE_REQUEST = 'EMPLOYEE_CREATE_REQUEST';
export const EMPLOYEE_CREATE_SUCCESS = 'EMPLOYEE_CREATE_SUCCESS';
export const EMPLOYEE_CREATE_FAILURE = 'EMPLOYEE_CREATE_FAILURE';

export const EMPLOYEE_REMOVE_REQUEST = 'EMPLOYEE_REMOVE_REQUEST';
export const EMPLOYEE_REMOVE_SUCCESS = 'EMPLOYEE_REMOVE_SUCCESS';
export const EMPLOYEE_REMOVE_FAILURE = 'EMPLOYEE_REMOVE_FAILURE';

export const EMPLOYEE_UPDATE_REQUEST = 'EMPLOYEE_UPDATE_REQUEST';
export const EMPLOYEE_UPDATE_SUCCESS = 'EMPLOYEE_UPDATE_SUCCESS';
export const EMPLOYEE_UPDATE_FAILURE = 'EMPLOYEE_UPDATE_FAILURE';

export interface Employee {
  id: string;
}

export interface EmployeeState {
  list: {
    [key: string]: Employee
  };
  employee: Employee;
  fetching: boolean;
  error: string;
  form: {
    fetching: boolean
    error: string
  }
}

const initialState: EmployeeState = {
  list: {},
  employee: null,
  fetching: true,
  error: null,
  form: {
    fetching: false,
    error: null
  }
};

export default (state = initialState, action: AnyAction): EmployeeState => {
  switch (action.type) {
    case EMPLOYEE_FETCH_ALL_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case EMPLOYEE_FETCH_ALL_SUCCESS: {
      const newList = {};

      action.payload.employees.forEach((element) => {
        newList[element.id] = {...element};
      });

      return {
        ...state,
        list: newList,
        fetching: false,
        error: null
      };
    }
    case EMPLOYEE_FETCH_ALL_FAILURE:
      return {
        ...state,
        list: {},
        fetching: false,
        error: action.error
      };
    case EMPLOYEE_FETCH_ONE_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case EMPLOYEE_FETCH_ONE_SUCCESS:
      return {
        ...state,
        employee: action.payload.employee,
        fetching: false,
        error: null
      }
    case EMPLOYEE_FETCH_ONE_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    case EMPLOYEE_CREATE_REQUEST:
      return {
        ...state,
        form: {
          fetching: true,
          error: null
        }
      }
    case EMPLOYEE_CREATE_SUCCESS:
      return {
        ...state,
        form: {
          fetching: false,
          error: null
        }
      }
    case EMPLOYEE_CREATE_FAILURE:
      return {
        ...state,
        form: {
          fetching: false,
          error: action.error
        }
      }
    case EMPLOYEE_REMOVE_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case EMPLOYEE_REMOVE_SUCCESS: {
      const newList = {...state.list}
      delete newList[action.payload.id]

      return {
        ...state,
        fetching: false,
        error: null,
        list: newList
      }
    }
    case EMPLOYEE_REMOVE_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    default:
      return state
  }
};
