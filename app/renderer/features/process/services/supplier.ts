import {BaseApi} from '../../../base-api';

export class SupplierApi extends BaseApi {
  public static getAll() {
    return BaseApi.get('/suppliers');
  }
}
