import {BaseApi} from '../../../base-api';

export class StockApi extends BaseApi {
  public static getAll() {
    return BaseApi.get('/stocks');
  }

  public static getOne(id) {
    return BaseApi.get(`/stocks/${id}`);
  }

  public static createOne(values) {
    return BaseApi.post('/stocks', values)
  }

  public static removeOne(id) {
    return BaseApi.delete(`/stocks/${id}`)
  }

  public static updateOne(values) {
    return BaseApi.patch(`/stocks/${values.id}`, values)
  }
}
