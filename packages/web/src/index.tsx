import React from "react"
import { loadableReady } from "@loadable/component"
import { hydrate } from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from "./App"

loadableReady(() => {
  const root = document.getElementById("root")
  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    root
  )
})
