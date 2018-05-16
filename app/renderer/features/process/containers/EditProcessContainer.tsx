import * as React from 'react';
import {ProcessForm} from '../components/ProcessForm';
import {Col, Row} from 'antd';
import {connect} from 'react-redux';
import {AppState} from '../../reducers';
import {getProcessForm, getProcessStateBranch} from '../selectors';
import {loadAdditionalData, loadOneProcess, updateProcess} from '../actions';

class EditEmployeeLogic extends React.Component<any> {

  componentDidMount() {
    this.props.load(this.props.match.params.id)
    this.props.loadAdditionalData()
  }

  onSubmit = async (values) => {
    this.props.update({...values, id: this.props.match.params.id})
  }

  render() {
    return (
      <Row>
        <Row type='flex' justify='center'>
          <Col xs={24} sm={12} md={8}>
            <h2>Редактирование процесса</h2>
          </Col>
        </Row>
        <Row type='flex' justify='center'>
          <Col xs={24} sm={12} md={8}>
            <ProcessForm
              data={this.props.supplier}
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

export const EditProcessContainer = connect(
  (state: AppState) => ({
    supplier: getProcessStateBranch(state).process,
    loading: getProcessForm(state).fetching || getProcessStateBranch(state).fetching,
    error: getProcessForm(state).error || getProcessStateBranch(state).error,

    stocks: getProcessForm(state).stocks,
    products: getProcessForm(state).products,
    clients: getProcessForm(state).clients,
    suppliers: getProcessForm(state).suppliers
  }),
  {
    update: updateProcess,
    load: loadOneProcess,
    loadAdditionalData: loadAdditionalData
  }
)(EditEmployeeLogic);
