import {BaseApi} from '../../../base-api';

export class SupplierApi extends BaseApi {
  public static getAll() {
    return BaseApi.get('/suppliers');
  }

  public static getOne(id) {
    return BaseApi.get(`/suppliers/${id}`);
  }

  public static createOne(values) {
    return BaseApi.post('/suppliers', values)
  }

  public static removeOne(id) {
    return BaseApi.delete(`/suppliers/${id}`)
  }

  public static updateOne(values) {
    return BaseApi.patch(`/suppliers/${values.id}`, values)
  }
}
