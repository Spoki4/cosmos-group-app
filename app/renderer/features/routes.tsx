import * as React from "react"
import { Route } from "react-router-dom"
import { AuthRoutes } from "./login/routes"
import { PanelLayout } from "../ui/PanelLayout"

export default () => (
  <>
    <AuthRoutes />
    <Route
      path="/panel"
      render={props => {
        return <PanelLayout renderMenu={() => {}} renderContent={() => {}} />
      }}
    />
  </>
)
