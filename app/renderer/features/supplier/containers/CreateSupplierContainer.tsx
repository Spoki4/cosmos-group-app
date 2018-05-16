import * as React from 'react';
import {SupplierForm} from '../components/SupplierForm';
import {Col, Row} from 'antd';
import {connect} from 'react-redux';
import {AppState} from '../../reducers';
import {getSupplierForm} from '../selectors';
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
            <h2>Добавление поставщика</h2>
          </Col>
        </Row>
        <Row type='flex' justify='center'>
          <Col xs={24} sm={12} md={8}>
            <SupplierForm
              fetching={this.props.loading}
              onSubmit={this.onSubmit}
            />
          </Col>
        </Row>
      </Row>
    );
  }
}

export const CreateSupplierContainer = connect(
  (state: AppState) => ({
    loading: getSupplierForm(state).fetching,
    error: getSupplierForm(state).error
  }),
  {
    create: createStock
  }
)(CreateEmployeeLogic);
