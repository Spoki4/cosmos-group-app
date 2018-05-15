import * as React from 'react';
import {Button, Col, Row} from 'antd';
import {EmployeeTable} from './EmployeeTable';

export const EmployeeList = ({employees, loading, error, onCreate, onEdit, onRemove}) => (
  <Row>
    <Row type='flex' justify='start'>
      <Col>
        <h2>Сотрудники</h2>
        <Button type='primary' onClick={onCreate}>
          Добавить
        </Button>
      </Col>
    </Row>
    <Row style={{marginTop: '16px'}} type='flex' justify='start'>
      <Col xs={24}>
        <EmployeeTable employees={employees} loading={loading} onEditClick={onEdit} onRemoveClick={onRemove}/>
      </Col>
    </Row>
  </Row>
)
