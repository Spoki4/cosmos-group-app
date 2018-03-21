export interface LoginParams {
  login: string
  password: string
}

export interface LoginResponse {
  token: string
  user: {
    login: string
    permission: any[]
  }
}

export class Api {
  static readonly URL = "http://127.0.0.1:3000/api"

  private static setupHeaders() {
    const headers = {
      "content-type": "application/json"
    }

    const apiToken = localStorage.getItem("token")
    if (apiToken) headers["Authorization"] = apiToken

    return headers
  }

  private static errorHandler(res: Response) {
    if (res.status >= 200 && res.status < 400) {
      return res.json()
    } else if (res.status >= 400 && res.status < 500) {
      return res.json().then(data => {
        throw new Error(data.name)
      })
    } else {
      throw new Error("InternalServerError")
    }
  }

  private static get<T>(url: string): Promise<T> {
    return fetch(Api.URL + url, {
      method: "get",
      headers: Api.setupHeaders()
    }).then(res => Api.errorHandler(res))
  }

  private static post<R>(url: string, params: any): Promise<R> {
    const requestParams: RequestInit = {
      method: "post",
      body: JSON.stringify(params),
      headers: Api.setupHeaders()
    }
    return fetch(Api.URL + url, requestParams).then(res =>
      Api.errorHandler(res)
    )
  }

  private static put<R>(url: string, params?: any): Promise<R> {
    const requestParams: RequestInit = {
      method: "put",
      body: params && JSON.stringify(params),
      headers: Api.setupHeaders()
    }
    return fetch(Api.URL + url, requestParams).then(res =>
      Api.errorHandler(res)
    )
  }

  private static delete<R>(url: string): Promise<R> {
    const requestParams: RequestInit = {
      method: "delete",
      headers: Api.setupHeaders()
    }
    return fetch(Api.URL + url, requestParams).then(res =>
      Api.errorHandler(res)
    )
  }

  public static login(params: LoginParams): Promise<LoginResponse> {
    return Api.post("/auth/login", params)
  }
}
