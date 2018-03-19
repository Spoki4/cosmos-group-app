import { Switch, Route, RouteComponentProps } from "react-router-dom"
import { LoginContainer } from "./containers/LoginContainer"

export const routes = ({ match }: RouteComponentProps<{}>) => (
  <Switch>
    <Route path={`${match.url}/`} exact component={LoginContainer} />
  </Switch>
)
