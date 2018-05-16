import * as React from 'react';
import {ProcessForm} from '../components/ProcessForm';
import {Col, Row} from 'antd';
import {connect} from 'react-redux';
import {AppState} from '../../reducers';
import {getProcessForm} from '../selectors';
import {createProcess, loadAdditionalData} from '../actions';

class CreateEmployeeLogic extends React.Component<any> {

  componentDidMount() {
    this.props.loadAdditionalData()
  }

  public onSubmit = async (values) => {
    this.props.create(values)
  }

  public render() {
    return (
      <Row>
        <Row type='flex' justify='center'>
          <Col xs={24} sm={12} md={8}>
            <h2>Добавление процесса</h2>
          </Col>
        </Row>
        <Row type='flex' justify='center'>
          <Col xs={24} sm={12} md={8}>
            <ProcessForm
              products={this.props.products}
              stocks={this.props.stocks}
              clients={this.props.clients}
              suppliers={this.props.suppliers}

              fetching={this.props.loading}
              onSubmit={this.onSubmit}
            />
          </Col>
        </Row>
      </Row>
    );
  }
}

export const CreateProcessContainer = connect(
  (state: AppState) => ({
    loading: getProcessForm(state).fetching,
    error: getProcessForm(state).error,

    stocks: getProcessForm(state).stocks,
    products: getProcessForm(state).products,
    clients: getProcessForm(state).clients,
    suppliers: getProcessForm(state).suppliers
  }),
  {
    create: createProcess,
    loadAdditionalData: loadAdditionalData
  }
)(CreateEmployeeLogic);
