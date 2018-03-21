import * as React from "react"
import createBrowserHistory from "history/createBrowserHistory"
import { Router, Route, Switch, Redirect } from "react-router-dom"
import { LoginContainer } from "./features/login/containers/LoginContainer"
import { Provider } from "react-redux"

const history = createBrowserHistory()

export default ({ store }) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/" store={store} component={LoginContainer} />
          <Redirect to="/" push />
        </Switch>
      </Router>
    </Provider>
  )
}
