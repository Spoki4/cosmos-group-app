import {
  CLIENT_CREATE_FAILURE,
  CLIENT_CREATE_REQUEST,
  CLIENT_CREATE_SUCCESS,
  CLIENT_FETCH_ALL_FAILURE,
  CLIENT_FETCH_ALL_REQUEST,
  CLIENT_FETCH_ALL_SUCCESS,
  CLIENT_FETCH_ONE_FAILURE,
  CLIENT_FETCH_ONE_REQUEST,
  CLIENT_FETCH_ONE_SUCCESS,
  CLIENT_REMOVE_FAILURE,
  CLIENT_REMOVE_REQUEST,
  CLIENT_REMOVE_SUCCESS,
  CLIENT_UPDATE_FAILURE,
  CLIENT_UPDATE_REQUEST,
  CLIENT_UPDATE_SUCCESS
} from './reducer';
import {ClientApi} from './services/client';
import {history} from '../../history';

export const loadAllStocks = () => async (dispatch) => {
  dispatch({type: CLIENT_FETCH_ALL_REQUEST})

  try {
    const data = await ClientApi.getAll();

    dispatch({type: CLIENT_FETCH_ALL_SUCCESS, payload: {clients: data}})
  } catch (error) {
    console.error(error)
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: CLIENT_FETCH_ALL_FAILURE, error: 'Не удалось получить данные'})
  }
}

export const loadOneStock = (id) => async (dispatch) => {
  dispatch({type: CLIENT_FETCH_ONE_REQUEST})

  try {
    const data = await ClientApi.getOne(id);

    dispatch({type: CLIENT_FETCH_ONE_SUCCESS, payload: {client: data}})
  } catch (error) {
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: CLIENT_FETCH_ONE_FAILURE, error: 'Не удалось получить данные'})
  }
}

export const createStock = (data) => async (dispatch) => {
  dispatch({type: CLIENT_CREATE_REQUEST})

  try {
    const response = await ClientApi.createOne(data)

    dispatch({type: CLIENT_CREATE_SUCCESS})
    history.push('/panel/clients')
  } catch (error) {
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: CLIENT_CREATE_FAILURE, error: 'Не удалось создать товар'})
  }
}

export const removeStock = (id) => async (dispatch) => {
  dispatch({type: CLIENT_REMOVE_REQUEST})

  try {
    const response = await ClientApi.removeOne(id)

    dispatch({type: CLIENT_REMOVE_SUCCESS, payload: {id}})
  } catch (error) {
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: CLIENT_REMOVE_FAILURE, error: 'Не удалось удалить товар'})
  }
}

export const updateStock = (values) => async (dispatch) => {
  dispatch({type: CLIENT_UPDATE_REQUEST})

  try {
    const response = await ClientApi.updateOne(values)

    dispatch({type: CLIENT_UPDATE_SUCCESS})
    history.push('/panel/clients')
  } catch (error) {
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: CLIENT_UPDATE_FAILURE, error: 'Не удалось обновить данные товара'})
  }
}
