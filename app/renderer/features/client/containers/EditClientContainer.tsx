import * as React from 'react';
import {ClientForm} from '../components/ClientForm';
import {Col, Row} from 'antd';
import {connect} from 'react-redux';
import {AppState} from '../../reducers';
import {getClientForm, getClientStateBranch} from '../selectors';
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
            <h2>Редактирование клиента</h2>
          </Col>
        </Row>
        <Row type='flex' justify='center'>
          <Col xs={24} sm={12} md={8}>
            <ClientForm
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

export const EditClientContainer = connect(
  (state: AppState) => ({
    supplier: getClientStateBranch(state).client,
    loading: getClientForm(state).fetching || getClientStateBranch(state).fetching,
    error: getClientForm(state).error || getClientStateBranch(state).error
  }),
  {
    update: updateStock,
    load: loadOneStock
  }
)(EditEmployeeLogic);
