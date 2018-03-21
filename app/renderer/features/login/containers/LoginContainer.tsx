import * as React from "react"
import { LoginPage } from "../components/pages/LoginPage"
import { connect } from "react-redux"
import { tryLogin } from "../actions"
import { AppState } from "../../../store"

interface State {
  loading: boolean
}

export class LoginContainerMarkup extends React.Component<any, State> {
  tryLogin = ({ login, password }) => {
    this.props.tryLogin({ login, password })
  }

  render() {
    return (
      <LoginPage
        tryLogin={this.tryLogin}
        loading={this.props.loading}
        error={this.props.error}
      />
    )
  }
}

export const LoginContainer = connect(
  (state: AppState) => ({
    loading: state.login.fetching,
    error: state.login.error
  }),
  { tryLogin }
)(LoginContainerMarkup)
