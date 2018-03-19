import * as React from "react"
import createBrowserHistory from "history/createBrowserHistory"
import { Router, Route, Switch, Redirect } from "react-router-dom"
import { LoginContainer } from "./features/login/containers/LoginContainer"

const history = createBrowserHistory()

export default ({ store }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" store={store} component={LoginContainer} />
        <Redirect to="/" push />
      </Switch>
    </Router>
  )
}
