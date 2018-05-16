import * as React from 'react';
import {ColumnProps} from 'antd/lib/table/interface';
import {Icon, Table} from 'antd';
import {Product} from '../reducer';

const columns = ({onRemoveClick, onEditClick}): Array<ColumnProps<Product>> => [
  {title: 'Название товара', dataIndex: 'name', key: 'name'},
  {title: 'Краткое описание', key: 'description', render: (text, record) => record.description.slice(0, 20)},
  {title: 'Размеры', key: 'size', render: (text, record) => (<>{record.width}x{record.height}x{record.length}</>)},
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

export const ProductTable = ({loading, products, onRemoveClick, onEditClick}) => (
  <Table
    rowKey={(record) => record.id}
    loading={loading}
    dataSource={products}
    columns={columns({onRemoveClick, onEditClick})}
  />
)
