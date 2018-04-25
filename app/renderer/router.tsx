import * as React from "react"
import createBrowserHistory from "history/createBrowserHistory"
import { Router, Route, Switch, Redirect } from "react-router-dom"
import { LoginContainer } from "./features/login/containers/LoginContainer"
import { Provider } from "react-redux"

import FeatureRoutes from "./features/routes"

const history = createBrowserHistory()

export default ({ store }) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <FeatureRoutes />
          <Redirect to="/" push />
        </Switch>
      </Router>
    </Provider>
  )
}
