import {
  SUPPLIER_CREATE_FAILURE,
  SUPPLIER_CREATE_REQUEST,
  SUPPLIER_CREATE_SUCCESS,
  SUPPLIER_FETCH_ALL_FAILURE,
  SUPPLIER_FETCH_ALL_REQUEST,
  SUPPLIER_FETCH_ALL_SUCCESS,
  SUPPLIER_FETCH_ONE_FAILURE,
  SUPPLIER_FETCH_ONE_REQUEST,
  SUPPLIER_FETCH_ONE_SUCCESS,
  SUPPLIER_REMOVE_FAILURE,
  SUPPLIER_REMOVE_REQUEST,
  SUPPLIER_REMOVE_SUCCESS,
  SUPPLIER_UPDATE_FAILURE,
  SUPPLIER_UPDATE_REQUEST,
  SUPPLIER_UPDATE_SUCCESS
} from './reducer';
import {SupplierApi} from './services/supplier';
import {history} from '../../history';

export const loadAllStocks = () => async (dispatch) => {
  dispatch({type: SUPPLIER_FETCH_ALL_REQUEST})

  try {
    const data = await SupplierApi.getAll();

    dispatch({type: SUPPLIER_FETCH_ALL_SUCCESS, payload: {suppliers: data}})
  } catch (error) {
    console.error(error)
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: SUPPLIER_FETCH_ALL_FAILURE, error: 'Не удалось получить данные'})
  }
}

export const loadOneStock = (id) => async (dispatch) => {
  dispatch({type: SUPPLIER_FETCH_ONE_REQUEST})

  try {
    const data = await SupplierApi.getOne(id);

    dispatch({type: SUPPLIER_FETCH_ONE_SUCCESS, payload: {supplier: data}})
  } catch (error) {
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: SUPPLIER_FETCH_ONE_FAILURE, error: 'Не удалось получить данные'})
  }
}

export const createStock = (data) => async (dispatch) => {
  dispatch({type: SUPPLIER_CREATE_REQUEST})

  try {
    const response = await SupplierApi.createOne(data)

    dispatch({type: SUPPLIER_CREATE_SUCCESS})
    history.push('/panel/suppliers')
  } catch (error) {
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: SUPPLIER_CREATE_FAILURE, error: 'Не удалось создать товар'})
  }
}

export const removeStock = (id) => async (dispatch) => {
  dispatch({type: SUPPLIER_REMOVE_REQUEST})

  try {
    const response = await SupplierApi.removeOne(id)

    dispatch({type: SUPPLIER_REMOVE_SUCCESS, payload: {id}})
  } catch (error) {
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: SUPPLIER_REMOVE_FAILURE, error: 'Не удалось удалить товар'})
  }
}

export const updateStock = (values) => async (dispatch) => {
  dispatch({type: SUPPLIER_UPDATE_REQUEST})

  try {
    const response = await SupplierApi.updateOne(values)

    dispatch({type: SUPPLIER_UPDATE_SUCCESS})
    history.push('/panel/suppliers')
  } catch (error) {
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: SUPPLIER_UPDATE_FAILURE, error: 'Не удалось обновить данные товара'})
  }
}
