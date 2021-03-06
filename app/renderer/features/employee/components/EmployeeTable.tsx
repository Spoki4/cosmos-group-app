import * as React from 'react';
import {ColumnProps} from 'antd/lib/table/interface';
import {Icon, Table} from 'antd';
import {Employee} from '../reducer';

const columns = ({onRemoveClick, onEditClick}): Array<ColumnProps<Employee>> => [
  {title: 'ФИО', dataIndex: 'fullname', key: 'fullname'},
  {title: 'Должность', dataIndex: 'position', key: 'position'},
  {title: 'Заработная плата', dataIndex: 'salary', key: 'salary'},
  {
    title: 'Действия',
    key: 'action',
    render: (text, record) => (
      <>
        <span style={{marginRight: '16px'}}>
          <Icon
            type='edit'
            onClick={() => onEditClick(record.id)}
            style={{cursor: 'pointer'}}
          />
        </span>
        <span>
          <Icon
            type='delete'
            onClick={() => onRemoveClick(record.id)}
            style={{cursor: 'pointer'}}
          />
        </span>
      </>
    )
  }
];

export const EmployeeTable = ({loading, employees, onRemoveClick, onEditClick}) => (
  <Table
    rowKey={(record) => record.id}
    loading={loading}
    dataSource={employees}
    columns={columns({onRemoveClick, onEditClick})}
  />
)
