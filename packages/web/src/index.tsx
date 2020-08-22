import React from "react"
import { hot } from "react-hot-loader/root"
import { loadableReady } from "@loadable/component"
import { AppRegistry } from "react-native"
import { Router } from "react-router-dom"
import "./assets/index.css"
import "./assets/helper.js"
import { history } from "@free/core/store/history"
import App from "./App"

const isDev = FREE_NODE_ENV !== "production"

AppRegistry.registerComponent("Web", () =>
  hot(() => (
    <Router history={history}>
      <App />
    </Router>
  ))
)

const renderClient = () =>
  AppRegistry.runApplication("Web", {
    rootTag: document.getElementById("root"),
  })

isDev
  ? renderClient()
  : loadableReady(() => {
      renderClient()
    })
