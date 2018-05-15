import * as React from 'react';
import {EmployeeForm} from '../components/EmployeeForm';
import {Col, Row} from 'antd';
import {connect} from 'react-redux';
import {AppState} from '../../reducers';
import {getEmployeeForm, getEmployeeStateBranch} from '../selectors';
import {loadOneEmployee, updateEmployee} from '../actions';

class EditEmployeeLogic extends React.Component<any> {

  componentDidMount() {
    this.props.load(this.props.match.params.id)
  }

  onSubmit = async (values) => {
    this.props.update({...values, id: this.props.match.params.id})
  }

  public render() {
    return (
      <Row>
        <Row type='flex' justify='center'>
          <Col xs={24} sm={12} md={8}>
            <h2>Редактирование сотрудника</h2>
          </Col>
        </Row>
        <Row type='flex' justify='center'>
          <Col xs={24} sm={12} md={8}>
            <EmployeeForm
              data={this.props.employee}
              fetching={this.props.loading}
              onSubmit={this.onSubmit}
            />
          </Col>
        </Row>
      </Row>
    );
  }
}

export const EditEmployeeContainer = connect(
  (state: AppState) => ({
    employee: getEmployeeStateBranch(state).employee,
    loading: getEmployeeForm(state).fetching || getEmployeeStateBranch(state).fetching,
    error: getEmployeeForm(state).error || getEmployeeStateBranch(state).error
  }),
  {
    update: updateEmployee,
    load: loadOneEmployee
  }
)(EditEmployeeLogic);
