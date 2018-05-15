import * as React from 'react';
import {ColumnProps} from 'antd/lib/table/interface';
import {User} from '../../users/reducer';
import {Icon, Table} from 'antd';

const columns = ({onRemoveClick, onEditClick}): Array<ColumnProps<User>> => [
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
