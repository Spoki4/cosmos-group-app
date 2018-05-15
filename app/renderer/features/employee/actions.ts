import {
  EMPLOYEE_CREATE_FAILURE,
  EMPLOYEE_CREATE_REQUEST,
  EMPLOYEE_CREATE_SUCCESS,
  EMPLOYEE_FETCH_ALL_FAILURE,
  EMPLOYEE_FETCH_ALL_REQUEST,
  EMPLOYEE_FETCH_ALL_SUCCESS,
  EMPLOYEE_FETCH_ONE_FAILURE,
  EMPLOYEE_FETCH_ONE_REQUEST,
  EMPLOYEE_FETCH_ONE_SUCCESS,
  EMPLOYEE_REMOVE_FAILURE,
  EMPLOYEE_REMOVE_REQUEST,
  EMPLOYEE_REMOVE_SUCCESS,
  EMPLOYEE_UPDATE_FAILURE,
  EMPLOYEE_UPDATE_REQUEST,
  EMPLOYEE_UPDATE_SUCCESS
} from './reducer';
import {EmployeeApi} from './services/employee';
import {history} from '../../history';

export const loadAllEmployee = () => async (dispatch) => {
  dispatch({type: EMPLOYEE_FETCH_ALL_REQUEST})

  try {
    const data = await EmployeeApi.getAll();

    dispatch({type: EMPLOYEE_FETCH_ALL_SUCCESS, payload: {employees: data}})
  } catch (error) {
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: EMPLOYEE_FETCH_ALL_FAILURE, error: 'Не удалось получить данные'})
  }
}

export const loadOneEmployee = (id) => async (dispatch) => {
  dispatch({type: EMPLOYEE_FETCH_ONE_REQUEST})

  try {
    const data = await EmployeeApi.getOne(id);

    dispatch({type: EMPLOYEE_FETCH_ONE_SUCCESS, payload: {employee: data}})
  } catch (error) {
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: EMPLOYEE_FETCH_ONE_FAILURE, error: 'Не удалось получить данные'})
  }
}

export const createEmployee = (data) => async (dispatch) => {
  dispatch({type: EMPLOYEE_CREATE_REQUEST})

  try {
    const response = await EmployeeApi.createOne(data)

    dispatch({type: EMPLOYEE_CREATE_SUCCESS})
    history.push('/panel/employee')
  } catch (error) {
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: EMPLOYEE_CREATE_FAILURE, error: 'Не удалось создать сотрудника'})
  }
}

export const removeEmployee = (id) => async (dispatch) => {
  dispatch({type: EMPLOYEE_REMOVE_REQUEST})

  try {
    const response = await EmployeeApi.removeOne(id)

    dispatch({type: EMPLOYEE_REMOVE_SUCCESS, payload: {id}})
  } catch (error) {
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: EMPLOYEE_REMOVE_FAILURE, error: 'Не удалось удалить сотрудника'})
  }
}

export const updateEmployee = (values) => async (dispatch) => {
  dispatch({type: EMPLOYEE_UPDATE_REQUEST})

  try {
    const response = await EmployeeApi.updateOne(values)

    dispatch({type: EMPLOYEE_UPDATE_SUCCESS})
    history.push('/panel/employee')
  } catch (error) {
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: EMPLOYEE_UPDATE_FAILURE, error: 'Не удалось обновить данные сотрудника'})
  }
}
