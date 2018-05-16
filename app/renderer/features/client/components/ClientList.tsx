import * as React from 'react';
import {Button, Col, Row} from 'antd';
import {ClientTable} from './ClientTable';

export const ClientList = ({suppliers, loading, error, onCreate, onEdit, onRemove}) => (
  <Row>
    <Row type='flex' justify='start'>
      <Col>
        <h2>Клиенты</h2>
        <Button type='primary' onClick={onCreate}>
          Добавить
        </Button>
      </Col>
    </Row>
    <Row style={{marginTop: '16px'}} type='flex' justify='start'>
      <Col xs={24}>
        <ClientTable suppliers={suppliers} loading={loading} onEditClick={onEdit} onRemoveClick={onRemove}/>
      </Col>
    </Row>
  </Row>
)
