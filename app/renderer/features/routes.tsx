import * as React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { AuthRoutes } from "./login/routes"
import { PanelLayout } from "../ui/PanelLayout"
import { UsersRoutes } from "./users/routes"
import { EmployeeRoutes } from "./employee/routes"

export default () => (
  <>
    <AuthRoutes />
    <Route
      path="/panel"
      render={props => {
        const token = localStorage.getItem("token")
        if (!token) return <Redirect to="/" />
        return (
          <PanelLayout
            renderMenu={() => {}}
            renderContent={() => (
              <Switch>
                <UsersRoutes {...props} />
                <EmployeeRoutes {...props} />
              </Switch>
            )}
          />
        )
      }}
    />
  </>
)
