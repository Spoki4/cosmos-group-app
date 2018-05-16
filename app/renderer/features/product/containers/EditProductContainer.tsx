import * as React from 'react';
import {ProductForm} from '../components/ProductForm';
import {Col, Row} from 'antd';
import {connect} from 'react-redux';
import {AppState} from '../../reducers';
import {getProductForm, getProductStateBranch} from '../selectors';
import {loadOneProduct, updateProduct} from '../actions';

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
            <h2>Редактирование товара</h2>
          </Col>
        </Row>
        <Row type='flex' justify='center'>
          <Col xs={24} sm={12} md={8}>
            <ProductForm
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

export const EditProductContainer = connect(
  (state: AppState) => ({
    employee: getProductStateBranch(state).product,
    loading: getProductForm(state).fetching || getProductStateBranch(state).fetching,
    error: getProductForm(state).error || getProductStateBranch(state).error
  }),
  {
    update: updateProduct,
    load: loadOneProduct
  }
)(EditEmployeeLogic);
