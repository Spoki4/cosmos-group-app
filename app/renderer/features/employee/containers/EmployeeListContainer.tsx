import * as React from 'react';
import {connect} from 'react-redux';
import {getAllEmployees, getEmployeeStateBranch} from '../selectors';
import {AppState} from '../../reducers';
import {loadAllEmployee, removeEmployee} from '../actions';
import {EmployeeList} from '../components/EmployeeList';

class EmployeeListLogic extends React.Component<any> {
  componentDidMount() {
    this.props.load()
  }

  onCreate = () =>
    this.props.history.push(`${this.props.match.url}/create`)

  onEdit = (id) =>
    this.props.history.push(`${this.props.match.url}/edit/${id}`)

  onRemove = (id) =>
    this.props.remove(id)

  render() {
    return (
      <EmployeeList
        employees={this.props.employees}
        loading={this.props.loading}
        error={this.props.error}
        onCreate={this.onCreate}
        onEdit={this.onEdit}
        onRemove={this.onRemove}
      />
    )
  }
}

export const EmployeeListContainer = connect(
  (state: AppState) => ({
    employees: getAllEmployees(state),
    loading: getEmployeeStateBranch(state).fetching,
    error: getEmployeeStateBranch(state).error
  }),
  {
    load: loadAllEmployee,
    remove: removeEmployee
  }
)(EmployeeListLogic)
