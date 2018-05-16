import {
  PROCESS_CREATE_FAILURE,
  PROCESS_CREATE_REQUEST,
  PROCESS_CREATE_SUCCESS,
  PROCESS_FETCH_ALL_FAILURE,
  PROCESS_FETCH_ALL_REQUEST,
  PROCESS_FETCH_ALL_SUCCESS,
  PROCESS_FETCH_ALL_SUCCESS_ONE,
  PROCESS_FETCH_ONE_FAILURE,
  PROCESS_FETCH_ONE_REQUEST,
  PROCESS_FETCH_ONE_SUCCESS,
  PROCESS_LOAD_ADDITIONAL_DATA_FAILURE,
  PROCESS_LOAD_ADDITIONAL_DATA_REQUEST,
  PROCESS_LOAD_ADDITIONAL_DATA_SUCCESS,
  PROCESS_REMOVE_FAILURE,
  PROCESS_REMOVE_REQUEST,
  PROCESS_REMOVE_SUCCESS,
  PROCESS_UPDATE_FAILURE,
  PROCESS_UPDATE_REQUEST,
  PROCESS_UPDATE_SUCCESS
} from './reducer';
import {ProcessApi} from './services/process';
import {history} from '../../history';
import {ProductApi} from './services/product';
import {StockApi} from './services/stock';
import {SupplierApi} from './services/supplier';
import {ClientApi} from './services/client';

export const loadAllProcesses = () => async (dispatch) => {
  dispatch({type: PROCESS_FETCH_ALL_REQUEST})

  try {
    const data = await ProcessApi.getAll() as Array<any>;

    dispatch({type: PROCESS_FETCH_ALL_SUCCESS, payload: {processes: data.map(item => ({...item, loading: true}))}})

    data.forEach(async item => {
      const [product, enterStock, exitStock, supplier, client] = await Promise.all([
        ProcessApi.getProduct(item.id),
        ProcessApi.getEnterStock(item.id),
        ProcessApi.getExitStock(item.id),
        ProcessApi.getSupplier(item.id),
        ProcessApi.getClient(item.id)
      ])

      dispatch({
        type: PROCESS_FETCH_ALL_SUCCESS_ONE,
        payload: {id: item.id, product, enterStock, exitStock, supplier, client}
      })

    })

  } catch (error) {
    console.error(error)
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: PROCESS_FETCH_ALL_FAILURE, error: 'Не удалось получить данные'})
  }
}

export const loadOneProcess = (id) => async (dispatch) => {
  dispatch({type: PROCESS_FETCH_ONE_REQUEST})

  try {
    const data = await ProcessApi.getOne(id) as any;

    const [product, enterStock, exitStock, supplier, client] = await Promise.all([
      ProcessApi.getProduct(data.id),
      ProcessApi.getEnterStock(data.id),
      ProcessApi.getExitStock(data.id),
      ProcessApi.getSupplier(data.id),
      ProcessApi.getClient(data.id)
    ])

    dispatch({
      type: PROCESS_FETCH_ONE_SUCCESS,
      payload: {process: {...data, product, enterStock, exitStock, supplier, client}}
    })
  } catch (error) {
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: PROCESS_FETCH_ONE_FAILURE, error: 'Не удалось получить данные'})
  }
}

export const createProcess = (data) => async (dispatch) => {
  dispatch({type: PROCESS_CREATE_REQUEST})

  try {
    const response = await ProcessApi.createOne(data)

    dispatch({type: PROCESS_CREATE_SUCCESS})
    history.push('/panel/processes')
  } catch (error) {
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: PROCESS_CREATE_FAILURE, error: 'Не удалось создать товар'})
  }
}

export const removeProcess = (id) => async (dispatch) => {
  dispatch({type: PROCESS_REMOVE_REQUEST})

  try {
    const response = await ProcessApi.removeOne(id)

    dispatch({type: PROCESS_REMOVE_SUCCESS, payload: {id}})
  } catch (error) {
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: PROCESS_REMOVE_FAILURE, error: 'Не удалось удалить товар'})
  }
}

export const updateProcess = (values) => async (dispatch) => {
  dispatch({type: PROCESS_UPDATE_REQUEST})

  try {
    const response = await ProcessApi.updateOne(values)

    dispatch({type: PROCESS_UPDATE_SUCCESS})
    history.push('/panel/processes')
  } catch (error) {
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: PROCESS_UPDATE_FAILURE, error: 'Не удалось обновить данные товара'})
  }
}


export const loadAdditionalData = () => async (dispatch) => {
  dispatch({type: PROCESS_LOAD_ADDITIONAL_DATA_REQUEST})

  try {
    const [products, stocks, suppliers, clients] = await Promise.all([ProductApi.getAll(), StockApi.getAll(), SupplierApi.getAll(), ClientApi.getAll()])


    dispatch({type: PROCESS_LOAD_ADDITIONAL_DATA_SUCCESS, payload: {products, stocks, suppliers, clients}})
  } catch (error) {
    if (error.message === 'AUTH_EXPIRES') {
      localStorage.clear();
      history.push('/')
    }

    dispatch({type: PROCESS_LOAD_ADDITIONAL_DATA_FAILURE, error: 'Не удалось подгрузить дополнительные данные'})
  }

}
