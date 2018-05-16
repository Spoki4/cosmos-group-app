import * as React from 'react';
import {ColumnProps} from 'antd/lib/table/interface';
import {Icon, Table} from 'antd';
import {Client} from '../reducer';

const columns = ({onRemoveClick, onEditClick}): Array<ColumnProps<Client>> => [
  {title: 'Название', dataIndex: 'name', key: 'name'},
  {title: 'Контакты', key: 'contacts', dataIndex: 'contacts'},
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

export const ClientTable = ({loading, suppliers, onRemoveClick, onEditClick}) => (
  <Table
    rowKey={(record) => record.id}
    loading={loading}
    dataSource={suppliers}
    columns={columns({onRemoveClick, onEditClick})}
  />
)
