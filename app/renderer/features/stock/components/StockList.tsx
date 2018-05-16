import * as React from 'react';
import {Button, Col, Row} from 'antd';
import {StockTable} from './StockTable';

export const StockList = ({products, loading, error, onCreate, onEdit, onRemove}) => (
  <Row>
    <Row type='flex' justify='start'>
      <Col>
        <h2>Склады</h2>
        <Button type='primary' onClick={onCreate}>
          Добавить
        </Button>
      </Col>
    </Row>
    <Row style={{marginTop: '16px'}} type='flex' justify='start'>
      <Col xs={24}>
        <StockTable products={products} loading={loading} onEditClick={onEdit} onRemoveClick={onRemove}/>
      </Col>
    </Row>
  </Row>
)
