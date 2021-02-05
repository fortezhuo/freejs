require("setimmediate")

import React from "react"
import { loadableReady } from "@loadable/component"
import { AppRegistry } from "react-native"
import "./assets/index.css"
import App from "./App"

const isDev = FREE_NODE_ENV !== "production"

AppRegistry.registerComponent("Web", () => () => <App />)

const renderClient = () =>
  AppRegistry.runApplication("Web", {
    rootTag: document.getElementById("root"),
  })

isDev
  ? renderClient()
  : loadableReady(() => {
      renderClient()
    })
