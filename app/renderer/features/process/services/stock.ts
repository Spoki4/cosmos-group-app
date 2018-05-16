import {BaseApi} from '../../../base-api';

export class StockApi extends BaseApi {
  public static getAll() {
    return BaseApi.get('/stocks');
  }
}
