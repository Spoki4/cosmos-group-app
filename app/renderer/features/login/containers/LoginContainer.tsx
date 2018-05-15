import * as React from 'react';
import {LoginPage} from '../components/pages/LoginPage';
import {connect} from 'react-redux';
import {tryLogin} from '../actions';
import {Redirect} from 'react-router';

interface State {
  loading: boolean;
}

export class LoginContainerMarkup extends React.Component<any, State> {
  public tryLogin = ({login, password}) => {
    this.props.tryLogin({login, password});
  }

  public render() {
    const token = localStorage.getItem('token');

    if (token) {
      return <Redirect to='/panel'/>;
    }

    return (
      <LoginPage
        tryLogin={this.tryLogin}
        loading={this.props.loading}
        error={this.props.error}
      />
    );
  }
}

export const LoginContainer = connect(
  (state: any) => ({
    loading: state.login.fetching,
    error: state.login.error
  }),
  { tryLogin }
)(LoginContainerMarkup);
