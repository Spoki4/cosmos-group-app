export class UsersApi {
  static readonly URL = process.env.NODE_ENV === "production"
    ? "https://cosmos-group-backend.herokuapp.com/api"
    : "http://127.0.0.1:3000/api"

  private static post<R>(url: string, params: any): Promise<R> {
    const requestParams: RequestInit = {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    }
    return fetch(
      UsersApi.URL + url + "?access_token=" + localStorage.getItem("token"),
      requestParams
    ).then(res => res.json())
  }

  private static get<R>(url: string): Promise<R> {
    const requestParams: RequestInit = {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    }
    return fetch(
      UsersApi.URL + url + "?access_token=" + localStorage.getItem("token"),
      requestParams
    ).then(res => res.json())
  }

  private static delete<R>(url: string): Promise<R> {
    const requestParams: RequestInit = {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      }
    }
    return fetch(
      UsersApi.URL + url + "?access_token=" + localStorage.getItem("token"),
      requestParams
    ).then(res => res.json())
  }

  public static getAll(): Promise<any> {
    return UsersApi.get("/users")
  }

  public static deleteOne(id: string): Promise<any> {
    return UsersApi.delete(`/users/${id}`)
  }

  public static createOne(data): Promise<any> {
    return UsersApi.post("/users", data)
  }
}
