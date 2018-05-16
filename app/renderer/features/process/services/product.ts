import {BaseApi} from '../../../base-api';

export class ProductApi extends BaseApi {
  public static getAll() {
    return BaseApi.get('/products');
  }
}
