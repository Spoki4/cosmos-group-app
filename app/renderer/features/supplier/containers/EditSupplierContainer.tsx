import * as React from 'react';
import {SupplierForm} from '../components/SupplierForm';
import {Col, Row} from 'antd';
import {connect} from 'react-redux';
import {AppState} from '../../reducers';
import {getSupplierForm, getSupplierStateBranch} from '../selectors';
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
            <h2>Редактирование поставщика</h2>
          </Col>
        </Row>
        <Row type='flex' justify='center'>
          <Col xs={24} sm={12} md={8}>
            <SupplierForm
              data={this.props.supplier}
              fetching={this.props.loading}
              onSubmit={this.onSubmit}
            />
          </Col>
        </Row>
      </Row>
    );
  }
}

export const EditSupplierContainer = connect(
  (state: AppState) => ({
    supplier: getSupplierStateBranch(state).supplier,
    loading: getSupplierForm(state).fetching || getSupplierStateBranch(state).fetching,
    error: getSupplierForm(state).error || getSupplierStateBranch(state).error
  }),
  {
    update: updateStock,
    load: loadOneStock
  }
)(EditEmployeeLogic);
