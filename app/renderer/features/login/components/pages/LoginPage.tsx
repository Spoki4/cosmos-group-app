import * as React from "react"
import { Layout, Row, Col, Button, Card, Form, Icon } from "antd"
import styled from "styled-components"
import { Input } from "../../../../components/Input"
import { LoginForm } from "../organisms/LoginForm"

const bg = require("../../assets/bg.svg")

const FullPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  background: #f0f2f5;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  min-height: 100vh;
`

const Container = styled.div`
  width: 400px;
  margin: auto;
`

const StyledCard = styled(Card)`
  width: 368px;
  background: transparent;
`

interface Props {
  tryLogin: ({ login, password }) => void
  loading: boolean
}

export const LoginPage = (props: Props) => (
  <FullPage>
    <Container>
      <StyledCard bordered={false}>
        <LoginForm loading={props.loading} onSubmit={props.tryLogin} />
      </StyledCard>
    </Container>
  </FullPage>
)