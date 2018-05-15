import * as React from 'react';
import {Card} from 'antd';
import styled from 'styled-components';
import {LoginForm} from '../organisms/LoginForm';

const bg = require('../../assets/bg.svg');

const FullPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  background: #f0f2f5 url(${bg}) no-repeat center 110px;
  background-size: 100%;
  min-height: 100vh;
`;

const Container = styled.div`
  width: 400px;
  margin: auto;
`;

const StyledCard = styled(Card)`
  width: 368px;
  background: transparent;

  & > .ant-card-head {
    background: transparent;
    border: none;
    margin: 0 auto;
  }

  & .ant-card-head-title {
    text-align: center;
  }
`;

const ErrorText = styled.span`
  color: #e83535;
`;

interface Props {
  tryLogin({login, password}): void;

  loading: boolean;
  error: string;
}

export const LoginPage = (props: Props) => (
  <FullPage>
    <Container>
      <StyledCard title='Авторизация' bordered={false}>
        {props.error && <ErrorText>{props.error}</ErrorText>}
        <LoginForm loading={props.loading} onSubmit={props.tryLogin} />
      </StyledCard>
    </Container>
  </FullPage>
);
