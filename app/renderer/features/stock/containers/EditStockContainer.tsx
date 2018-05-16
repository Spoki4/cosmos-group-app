import * as React from 'react';
import {StockForm} from '../components/StockForm';
import {Col, Row} from 'antd';
import {connect} from 'react-redux';
import {AppState} from '../../reducers';
import {getStockForm, getStockStateBranch} from '../selectors';
import {loadOneStock, updateStock} from '../actions';

class EditEmployeeLogic extends React.Component<any> {

  componentDidMount() {
    this.props.load(this.props.match.params.id)
  }

  onSubmit = async (values) => {
    this.props.update({...values, id: this.props.match.params.id})
  }

  render() {
    return (
      <Row>
        <Row type='flex' justify='center'>
          <Col xs={24} sm={12} md={8}>
            <h2>Редактирование товара</h2>
          </Col>
        </Row>
        <Row type='flex' justify='center'>
          <Col xs={24} sm={12} md={8}>
            <StockForm
              data={this.props.stock}
              fetching={this.props.loading}
              onSubmit={this.onSubmit}
            />
          </Col>
        </Row>
      </Row>
    );
  }
}

export const EditStockContainer = connect(
  (state: AppState) => ({
    stock: getStockStateBranch(state).stock,
    loading: getStockForm(state).fetching || getStockStateBranch(state).fetching,
    error: getStockForm(state).error || getStockStateBranch(state).error
  }),
  {
    update: updateStock,
    load: loadOneStock
  }
)(EditEmployeeLogic);
