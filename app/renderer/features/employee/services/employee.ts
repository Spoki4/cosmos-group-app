import {BaseApi} from '../../../base-api';

export class EmployeeApi extends BaseApi {
  public static getAll() {
    return BaseApi.get('/employees');
  }

  public static getOne(id) {
    return BaseApi.get(`/employees/${id}`);
  }

  public static createOne(values) {
    return BaseApi.post('/employees', values)
  }

  public static removeOne(id) {
    return BaseApi.delete(`/employees/${id}`)
  }

  public static updateOne(values) {
    return BaseApi.patch(`/employees/${values.id}`, values)
  }
}
