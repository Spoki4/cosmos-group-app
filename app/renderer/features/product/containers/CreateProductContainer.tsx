import * as React from 'react';
import {ProductForm} from '../components/ProductForm';
import {Col, Row} from 'antd';
import {connect} from 'react-redux';
import {AppState} from '../../reducers';
import {getProductForm} from '../selectors';
import {createProduct} from '../actions';

class CreateEmployeeLogic extends React.Component<any> {

  public onSubmit = async (values) => {
    this.props.create(values)
  }

  public render() {
    return (
      <Row>
        <Row type='flex' justify='center'>
          <Col xs={24} sm={12} md={8}>
            <h2>Добавление товара</h2>
          </Col>
        </Row>
        <Row type='flex' justify='center'>
          <Col xs={24} sm={12} md={8}>
            <ProductForm
              fetching={this.props.loading}
              onSubmit={this.onSubmit}
            />
          </Col>
        </Row>
      </Row>
    );
  }
}

export const CreateProductContainer = connect(
  (state: AppState) => ({
    loading: getProductForm(state).fetching,
    error: getProductForm(state).error
  }),
  {
    create: createProduct
  }
)(CreateEmployeeLogic);
