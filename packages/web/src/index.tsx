import React from "react"
import { hot } from "react-hot-loader/root"
import { loadableReady } from "@loadable/component"
import { AppRegistry } from "react-native"
import { BrowserRouter } from "react-router-dom"
import App from "./App"

import "./assets/index.css"
import "./assets/helper.js"

const isDev = FREE_NODE_ENV !== "production"

AppRegistry.registerComponent("Web", () =>
  hot(() => (
    <BrowserRouter>
      <App />
    </BrowserRouter>
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
