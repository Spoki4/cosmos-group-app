import { Route } from "react-router"
import * as React from "react"

export const EmployeeRoutes = ({ match }) => (
  <>
    <Route
      path={`${match.url}/employee`}
      exact
      component={() => <div>employee</div>}
    />
  </>
)
