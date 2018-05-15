import * as React from 'react';
import {UserTable} from '../organisms/UserTable';
import {User} from '../../reducer';
import {Button, Col, Row} from 'antd';

interface Props {
  fetching: boolean;
  users: User[];
  error: string;
  onRemove: (id: string) => void;
  onCreate: () => void;
}

export const UserList = ({
  users,
  fetching,
  error,
  onRemove,
  onCreate
}: Props) => (
  <Row>
    <Row type='flex' justify='start'>
      <Col>
        <h2>Пользователи</h2>
        <Button type='primary' onClick={onCreate}>
          Создать
        </Button>
      </Col>
    </Row>
    <Row style={{marginTop: '16px'}} type='flex' justify='start'>
      <Col xs={24}>
        <UserTable users={users} fetching={fetching} onRemoveClick={onRemove} />
      </Col>
    </Row>
  </Row>
);
