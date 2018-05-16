import * as React from 'react';
import {Button, Col, Row} from 'antd';
import {ProcessCard} from './ProcessCard';

export const ProcessList = ({processes, loading, error, onCreate, onEdit, onRemove}) => (
  <Row>
    <Row type='flex' justify='start'>
      <Col>
        <h2>Логистические процессы</h2>
        <Button type='primary' onClick={onCreate}>
          Добавить
        </Button>
      </Col>
    </Row>
    <Row style={{marginTop: '16px'}} type='flex' justify='start'>
      {processes.map(item => (
        <Col key={item.id}>
          <ProcessCard process={item} loading={item.loading} error={item.error} onEdit={onEdit} onRemove={onRemove}/>
        </Col>
      ))}
    </Row>
  </Row>
)
