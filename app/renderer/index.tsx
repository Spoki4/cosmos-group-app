import * as React from "react"
import * as ReactDOM from "react-dom"
import Router from "./router"
import createStore from "./store"

import "antd/dist/antd.css"

const store = createStore()

const render = Component => {
  ReactDOM.render(
    <Component store={store} />,
    document.getElementById("parcel-root")
  )
}

render(Router)
