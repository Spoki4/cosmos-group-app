import * as React from 'react';
import {Button, Col, Row} from 'antd';
import {ProductTable} from './ProductTable';

export const ProductList = ({products, loading, error, onCreate, onEdit, onRemove}) => (
  <Row>
    <Row type='flex' justify='start'>
      <Col>
        <h2>Товары</h2>
        <Button type='primary' onClick={onCreate}>
          Добавить
        </Button>
      </Col>
    </Row>
    <Row style={{marginTop: '16px'}} type='flex' justify='start'>
      <Col xs={24}>
        <ProductTable products={products} loading={loading} onEditClick={onEdit} onRemoveClick={onRemove}/>
      </Col>
    </Row>
  </Row>
)
