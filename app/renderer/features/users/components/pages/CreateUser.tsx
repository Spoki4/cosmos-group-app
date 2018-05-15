import * as React from 'react';
import {Col, Row} from 'antd';
import {UserForm} from '../organisms/UserForm';

export const CreateUser = ({ onSubmit, fetching, error }) => (
  <Row>
    <Row type='flex' justify='center'>
      <Col xs={24} sm={12} md={8}>
        <h2>Создание пользователя</h2>
      </Col>
    </Row>
    <Row type='flex' justify='center'>
      <Col xs={24} sm={12} md={8}>
        <UserForm onSubmit={onSubmit} fetching={fetching} />
      </Col>
    </Row>
  </Row>
);
