import {BaseApi} from '../../../base-api';

export class ProductApi extends BaseApi {
  public static getAll() {
    return BaseApi.get('/products');
  }

  public static getOne(id) {
    return BaseApi.get(`/products/${id}`);
  }

  public static createOne(values) {
    return BaseApi.post('/products', values)
  }

  public static removeOne(id) {
    return BaseApi.delete(`/products/${id}`)
  }

  public static updateOne(values) {
    return BaseApi.patch(`/products/${values.id}`, values)
  }
}
