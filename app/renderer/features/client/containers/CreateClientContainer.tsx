import * as React from 'react';
import {ClientForm} from '../components/ClientForm';
import {Col, Row} from 'antd';
import {connect} from 'react-redux';
import {AppState} from '../../reducers';
import {getClientForm} from '../selectors';
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
            <h2>Добавление клиента</h2>
          </Col>
        </Row>
        <Row type='flex' justify='center'>
          <Col xs={24} sm={12} md={8}>
            <ClientForm
              fetching={this.props.loading}
              onSubmit={this.onSubmit}
            />
          </Col>
        </Row>
      </Row>
    );
  }
}

export const CreateClientContainer = connect(
  (state: AppState) => ({
    loading: getClientForm(state).fetching,
    error: getClientForm(state).error
  }),
  {
    create: createStock
  }
)(CreateEmployeeLogic);
