import * as React from 'react';
import {connect} from 'react-redux';
import {getAllStocks, getStockStateBranch} from '../selectors';
import {AppState} from '../../reducers';
import {loadAllStocks, removeStock} from '../actions';
import {StockList} from '../components/StockList';

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
      <StockList
        products={this.props.products}
        loading={this.props.loading}
        error={this.props.error}
        onCreate={this.onCreate}
        onEdit={this.onEdit}
        onRemove={this.onRemove}
      />
    )
  }
}

export const StockListContainer = connect(
  (state: AppState) => ({
    products: getAllStocks(state),
    loading: getStockStateBranch(state).fetching,
    error: getStockStateBranch(state).error
  }),
  {
    load: loadAllStocks,
    remove: removeStock
  }
)(EmployeeListLogic)
