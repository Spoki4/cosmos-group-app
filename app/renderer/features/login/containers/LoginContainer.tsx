import * as React from "react"
import { LoginPage } from "../components/pages/LoginPage"

interface State {
  loading: boolean
}

export class LoginContainer extends React.Component<{}, State> {
  state = { loading: false }

  tryLogin = ({ login, password }) => {
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ loading: false })
    }, 2500)
  }

  render() {
    return <LoginPage tryLogin={this.tryLogin} loading={this.state.loading} />
  }
}
