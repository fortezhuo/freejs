import React from "react"
import { hot } from "react-hot-loader/root"
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

const AppLayout = loadable(() => import("@free/core/component/AppLayout"), {
  ssr: true,
  fallback: <span>Loading ...</span>,
})

const App = () => {
  return (
    <AppLayout>
      <Home />
    </AppLayout>
  )
}
export default hot(App)
