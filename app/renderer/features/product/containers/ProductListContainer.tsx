import * as React from 'react';
import {connect} from 'react-redux';
import {getAllProducts, getProductStateBranch} from '../selectors';
import {AppState} from '../../reducers';
import {loadAllProducts, removeProduct} from '../actions';
import {ProductList} from '../components/ProductList';

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
      <ProductList
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

export const ProductListContainer = connect(
  (state: AppState) => ({
    products: getAllProducts(state),
    loading: getProductStateBranch(state).fetching,
    error: getProductStateBranch(state).error
  }),
  {
    load: loadAllProducts,
    remove: removeProduct
  }
)(EmployeeListLogic)
