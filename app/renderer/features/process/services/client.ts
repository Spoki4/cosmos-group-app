import {BaseApi} from '../../../base-api';

export class ClientApi extends BaseApi {
  public static getAll() {
    return BaseApi.get('/clients');
  }
}
