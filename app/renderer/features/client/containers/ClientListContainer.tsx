import * as React from 'react';
import {connect} from 'react-redux';
import {getAllClients, getClientStateBranch} from '../selectors';
import {AppState} from '../../reducers';
import {loadAllStocks, removeStock} from '../actions';
import {ClientList} from '../components/ClientList';

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
      <ClientList
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

export const ClientListContainer = connect(
  (state: AppState) => ({
    suppliers: getAllClients(state),
    loading: getClientStateBranch(state).fetching,
    error: getClientStateBranch(state).error
  }),
  {
    load: loadAllStocks,
    remove: removeStock
  }
)(EmployeeListLogic)
