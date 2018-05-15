import * as React from 'react';
import {Icon, Table} from 'antd';
import {User} from '../../reducer';
import {ColumnProps} from 'antd/lib/table/interface';

interface Props {
  users: User[];
  fetching: boolean;
  onRemoveClick: (id: string) => void;
}

const columns = ({onRemoveClick}): Array<ColumnProps<User>> => [
  {title: 'Логин', dataIndex: 'username', key: 'login'},
  {title: 'Email', dataIndex: 'email', key: 'email'},
  {
    title: 'Действия',
    key: 'action',
    render: (text, record) => (
      <span>
        <Icon
          type='delete'
          onClick={() => onRemoveClick(record.id)}
          style={{cursor: 'pointer'}}
        />
      </span>
    )
  }
];

export const UserTable = ({ users, fetching, onRemoveClick }: Props) => (
  <Table
    rowKey={(record) => record.id}
    loading={fetching}
    dataSource={users}
    columns={columns({ onRemoveClick })}
  />
);
