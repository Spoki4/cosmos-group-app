import * as React from 'react';
import {StockForm} from '../components/StockForm';
import {Col, Row} from 'antd';
import {connect} from 'react-redux';
import {AppState} from '../../reducers';
import {getStockForm} from '../selectors';
import {createStock} from '../actions';

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
            <StockForm
              fetching={this.props.loading}
              onSubmit={this.onSubmit}
            />
          </Col>
        </Row>
      </Row>
    );
  }
}

export const CreateStockContainer = connect(
  (state: AppState) => ({
    loading: getStockForm(state).fetching,
    error: getStockForm(state).error
  }),
  {
    create: createStock
  }
)(CreateEmployeeLogic);
