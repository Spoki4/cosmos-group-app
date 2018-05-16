import * as React from 'react';
import {connect} from 'react-redux';
import {getAllSuppliers, getSupplierStateBranch} from '../selectors';
import {AppState} from '../../reducers';
import {loadAllStocks, removeStock} from '../actions';
import {SupplierList} from '../components/SupplierList';

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
      <SupplierList
        suppliers={this.props.suppliers}
        loading={this.props.loading}
        error={this.props.error}
        onCreate={this.onCreate}
        onEdit={this.onEdit}
        onRemove={this.onRemove}
      />
    )
  }
}

export const SupplierListContainer = connect(
  (state: AppState) => ({
    suppliers: getAllSuppliers(state),
    loading: getSupplierStateBranch(state).fetching,
    error: getSupplierStateBranch(state).error
  }),
  {
    load: loadAllStocks,
    remove: removeStock
  }
)(EmployeeListLogic)
