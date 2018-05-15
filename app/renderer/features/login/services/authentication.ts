export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  error: {
    code: string
    statusCode: number
  };
}

export class AuthApi {
  public static readonly URL = process.env.NODE_ENV === 'production'
    ? 'https://cosmos-group-backend.herokuapp.com/api'
    : 'http://127.0.0.1:3000/api';

  private static post<R>(url: string, params: any): Promise<R> {
    const requestParams: RequestInit = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    };
    return fetch(AuthApi.URL + url, requestParams).then((res) => res.json());
  }

  public static login(params: LoginParams): Promise<LoginResponse> {
    return AuthApi.post('/login', params);
  }
}
