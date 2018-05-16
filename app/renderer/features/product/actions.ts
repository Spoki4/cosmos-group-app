import {
  PRODUCT_CREATE_FAILURE,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_FETCH_ALL_FAILURE,
  PRODUCT_FETCH_ALL_REQUEST,
  PRODUCT_FETCH_ALL_SUCCESS,
  PRODUCT_FETCH_ONE_FAILURE,
  PRODUCT_FETCH_ONE_REQUEST,
  PRODUCT_FETCH_ONE_SUCCESS,
  PRODUCT_REMOVE_FAILURE,
  PRODUCT_REMOVE_REQUEST,
  PRODUCT_REMOVE_SUCCESS,
  PRODUCT_UPDATE_FAILURE,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS
} from './reducer';
import {ProductApi} from './services/product';
import {history} from '../../history';

export const loadAllProducts = () => async (dispatch) => {
  dispatch({type: PRODUCT_FETCH_ALL_REQUEST})

  try {
    const data = await ProductApi.getAll();

    dispatch({type: PRODUCT_FETCH_ALL_SUCCESS, payload: {products: data}})
  } catch (error) {
    console.error(error)
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: PRODUCT_FETCH_ALL_FAILURE, error: 'Не удалось получить данные'})
  }
}

export const loadOneProduct = (id) => async (dispatch) => {
  dispatch({type: PRODUCT_FETCH_ONE_REQUEST})

  try {
    const data = await ProductApi.getOne(id);

    dispatch({type: PRODUCT_FETCH_ONE_SUCCESS, payload: {product: data}})
  } catch (error) {
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: PRODUCT_FETCH_ONE_FAILURE, error: 'Не удалось получить данные'})
  }
}

export const createProduct = (data) => async (dispatch) => {
  dispatch({type: PRODUCT_CREATE_REQUEST})

  try {
    const response = await ProductApi.createOne(data)

    dispatch({type: PRODUCT_CREATE_SUCCESS})
    history.push('/panel/products')
  } catch (error) {
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: PRODUCT_CREATE_FAILURE, error: 'Не удалось создать товар'})
  }
}

export const removeProduct = (id) => async (dispatch) => {
  dispatch({type: PRODUCT_REMOVE_REQUEST})

  try {
    const response = await ProductApi.removeOne(id)

    dispatch({type: PRODUCT_REMOVE_SUCCESS, payload: {id}})
  } catch (error) {
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: PRODUCT_REMOVE_FAILURE, error: 'Не удалось удалить товар'})
  }
}

export const updateProduct = (values) => async (dispatch) => {
  dispatch({type: PRODUCT_UPDATE_REQUEST})

  try {
    const response = await ProductApi.updateOne(values)

    dispatch({type: PRODUCT_UPDATE_SUCCESS})
    history.push('/panel/products')
  } catch (error) {
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: PRODUCT_UPDATE_FAILURE, error: 'Не удалось обновить данные товара'})
  }
}
