import {BaseApi} from '../../../base-api';

export class ClientApi extends BaseApi {
  public static getAll() {
    return BaseApi.get('/clients');
  }

  public static getOne(id) {
    return BaseApi.get(`/clients/${id}`);
  }

  public static createOne(values) {
    return BaseApi.post('/clients', values)
  }

  public static removeOne(id) {
    return BaseApi.delete(`/clients/${id}`)
  }

  public static updateOne(values) {
    return BaseApi.patch(`/clients/${values.id}`, values)
  }
}
