import {BaseApi} from '../../../base-api';

export class ProcessApi extends BaseApi {
  public static getAll() {
    return BaseApi.get('/processes');
  }

  public static getOne(id) {
    return BaseApi.get(`/processes/${id}`);
  }

  public static createOne(values) {
    return BaseApi.post('/processes', values)
  }

  public static removeOne(id) {
    return BaseApi.delete(`/processes/${id}`)
  }

  public static updateOne(values) {
    return BaseApi.patch(`/processes/${values.id}`, values)
  }

  static getProduct(id) {
    return BaseApi.get(`/processes/${id}/product`)
  }

  static getEnterStock(id) {
    return BaseApi.get(`/processes/${id}/stockEnter`)
  }

  static getExitStock(id) {
    return BaseApi.get(`/processes/${id}/stockExit`)
  }

  static getSupplier(id) {
    return BaseApi.get(`/processes/${id}/supplier`)
  }

  static getClient(id) {
    return BaseApi.get(`/processes/${id}/client`)
  }
}
