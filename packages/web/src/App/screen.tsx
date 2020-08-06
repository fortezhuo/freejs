import React from "react"
import loadable from "@loadable/component"
import { Switch, Route } from "react-router-dom"

const Home = loadable(() => import("@free/core/screen/Home"), {
  ssr: true,
  fallback: <span>Loading ...</span>,
})

const View = loadable(() => import("@free/core/screen/View"), {
  ssr: true,
  fallback: <span>Loading ...</span>,
})

export const Screen = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/view" component={View} />
    </Switch>
  )
}
