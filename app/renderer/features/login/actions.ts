import {LOGIN_API_CALL_FAILURE, LOGIN_API_CALL_REQUEST, LOGIN_API_CALL_SUCCESS} from './reducer';
import {AuthApi} from './services/authentication';

export const tryLogin = ({login, password}) => async (dispatch) => {
  dispatch({type: LOGIN_API_CALL_REQUEST});

  try {
    const data = await AuthApi.login({username: login, password});

    if (data.error && data.error.code === 'LOGIN_FAILED') {
      return dispatch({
        type: LOGIN_API_CALL_FAILURE,
        error: 'Пользователь не найден'
      });
    }

    localStorage.setItem('token', data.token);

    dispatch({type: LOGIN_API_CALL_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: LOGIN_API_CALL_FAILURE, error: 'Неизвестная ошибка'});
  }
};
