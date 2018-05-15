import * as React from 'react';
import {EmployeeForm} from '../components/EmployeeForm';
import {Col, Row} from 'antd';
import {connect} from 'react-redux';
import {AppState} from '../../reducers';
import {getEmployeeForm} from '../selectors';
import {createEmployee} from '../actions';

class CreateEmployeeLogic extends React.Component<any> {

  public onSubmit = async (values) => {
    this.props.create(values)
  }

  public render() {
    return (
      <Row>
        <Row type='flex' justify='center'>
          <Col xs={24} sm={12} md={8}>
            <h2>Добавление сотрудника</h2>

          </Col>
        </Row>
        <Row type='flex' justify='center'>
          <Col xs={24} sm={12} md={8}>
            <EmployeeForm
              fetching={this.props.loading}
              onSubmit={this.onSubmit}
            />
          </Col>
        </Row>
      </Row>
    );
  }
}

export const CreateEmployeeContainer = connect(
  (state: AppState) => ({
    loading: getEmployeeForm(state).fetching,
    error: getEmployeeForm(state).error
  }),
  {
    create: createEmployee
  }
)(CreateEmployeeLogic);
