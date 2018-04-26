import * as React from "react"
import { Row, Col } from "antd"
import { UserForm } from "../organisms/UserForm"

export const CreateUser = ({ onSubmit, fetching, error }) => (
  <Row>
    <Row>
      <Col>
        <h2>Создание пользователя</h2>
      </Col>
    </Row>
    <Row type="flex" justify="center">
      <Col xs={12}>
        <UserForm onSubmit={onSubmit} fetching={fetching} />
      </Col>
    </Row>
  </Row>
)
