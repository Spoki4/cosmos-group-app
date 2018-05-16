import {
  STOCK_CREATE_FAILURE,
  STOCK_CREATE_REQUEST,
  STOCK_CREATE_SUCCESS,
  STOCK_FETCH_ALL_FAILURE,
  STOCK_FETCH_ALL_REQUEST,
  STOCK_FETCH_ALL_SUCCESS,
  STOCK_FETCH_ONE_FAILURE,
  STOCK_FETCH_ONE_REQUEST,
  STOCK_FETCH_ONE_SUCCESS,
  STOCK_REMOVE_FAILURE,
  STOCK_REMOVE_REQUEST,
  STOCK_REMOVE_SUCCESS,
  STOCK_UPDATE_FAILURE,
  STOCK_UPDATE_REQUEST,
  STOCK_UPDATE_SUCCESS
} from './reducer';
import {StockApi} from './services/stock';
import {history} from '../../history';

export const loadAllStocks = () => async (dispatch) => {
  dispatch({type: STOCK_FETCH_ALL_REQUEST})

  try {
    const data = await StockApi.getAll();

    dispatch({type: STOCK_FETCH_ALL_SUCCESS, payload: {stocks: data}})
  } catch (error) {
    console.error(error)
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: STOCK_FETCH_ALL_FAILURE, error: 'Не удалось получить данные'})
  }
}

export const loadOneStock = (id) => async (dispatch) => {
  dispatch({type: STOCK_FETCH_ONE_REQUEST})

  try {
    const data = await StockApi.getOne(id);

    dispatch({type: STOCK_FETCH_ONE_SUCCESS, payload: {stock: data}})
  } catch (error) {
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: STOCK_FETCH_ONE_FAILURE, error: 'Не удалось получить данные'})
  }
}

export const createStock = (data) => async (dispatch) => {
  dispatch({type: STOCK_CREATE_REQUEST})

  try {
    const response = await StockApi.createOne(data)

    dispatch({type: STOCK_CREATE_SUCCESS})
    history.push('/panel/stocks')
  } catch (error) {
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: STOCK_CREATE_FAILURE, error: 'Не удалось создать товар'})
  }
}

export const removeStock = (id) => async (dispatch) => {
  dispatch({type: STOCK_REMOVE_REQUEST})

  try {
    const response = await StockApi.removeOne(id)

    dispatch({type: STOCK_REMOVE_SUCCESS, payload: {id}})
  } catch (error) {
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: STOCK_REMOVE_FAILURE, error: 'Не удалось удалить товар'})
  }
}

export const updateStock = (values) => async (dispatch) => {
  dispatch({type: STOCK_UPDATE_REQUEST})

  try {
    const response = await StockApi.updateOne(values)

    dispatch({type: STOCK_UPDATE_SUCCESS})
    history.push('/panel/stocks')
  } catch (error) {
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: STOCK_UPDATE_FAILURE, error: 'Не удалось обновить данные товара'})
  }
}
