import * as React from 'react';
import {Button, Col, Row} from 'antd';
import {SupplierTable} from './SupplierTable';

export const SupplierList = ({suppliers, loading, error, onCreate, onEdit, onRemove}) => (
  <Row>
    <Row type='flex' justify='start'>
      <Col>
        <h2>Поставщики</h2>
        <Button type='primary' onClick={onCreate}>
          Добавить
        </Button>
      </Col>
    </Row>
    <Row style={{marginTop: '16px'}} type='flex' justify='start'>
      <Col xs={24}>
        <SupplierTable suppliers={suppliers} loading={loading} onEditClick={onEdit} onRemoveClick={onRemove}/>
      </Col>
    </Row>
  </Row>
)
