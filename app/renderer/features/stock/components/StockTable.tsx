import * as React from 'react';
import {ColumnProps} from 'antd/lib/table/interface';
import {Icon, Table} from 'antd';
import {Stock} from '../reducer';

const columns = ({onRemoveClick, onEditClick}): Array<ColumnProps<Stock>> => [
  {title: 'Название', dataIndex: 'name', key: 'name'},
  {title: 'Адрес', key: 'address', dataIndex: 'address'},
  {title: 'Контакты', key: 'contacts', dataIndex: 'contacts'},
  {title: 'Вместимость', key: 'maxCapacity', dataIndex: 'maxCapacity'},
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

export const StockTable = ({loading, products, onRemoveClick, onEditClick}) => (
  <Table
    rowKey={(record) => record.id}
    loading={loading}
    dataSource={products}
    columns={columns({onRemoveClick, onEditClick})}
  />
)
