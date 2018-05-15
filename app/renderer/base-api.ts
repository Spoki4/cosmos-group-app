export class BaseApi {
  protected static readonly URL = process.env.NODE_ENV === 'production'
    ? 'https://cosmos-group-backend.herokuapp.com/api'
    : 'http://127.0.0.1:3000/api';

  protected static post<R>(url: string, params: any): Promise<R> {
    const requestParams: RequestInit = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    };
    return BaseApi.request(url, requestParams)
  }

  protected static get<R>(url: string): Promise<R> {
    const requestParams: RequestInit = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return BaseApi.request(url, requestParams)
  }

  protected static delete<R>(url: string): Promise<R> {
    const requestParams: RequestInit = {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return BaseApi.request(url, requestParams)
  }

  protected static patch<R>(url: string, params: any): Promise<R> {
    const requestParams: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    };
    return BaseApi.request(url, requestParams)
  }

  private static request(url: string, requestParams: RequestInit) {
    return fetch(`${BaseApi.URL}${url}?access_token=${localStorage.getItem('token')}`, requestParams)
      .then(response => {
        if (response.status === 401 || response.status === 403) {
          throw new Error('AUTH_EXPIRES');
        }

        return response.json();
      }).then(data => {
        if (data.error) {
          throw new Error(data.error.message)
        }
        return data
      });
  }
}
