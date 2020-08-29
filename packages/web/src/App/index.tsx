import React from "react"
import loadable from "@loadable/component"
import { Switch, Route } from "react-router-dom"

const Home = loadable(() => import("@free/core/screen/PageHome"), {
  ssr: true,
  fallback: <span>Loading ...</span>,
})

const Login = loadable(() => import("@free/core/screen/PageLogin"), {
  ssr: true,
  fallback: <span>Loading ...</span>,
})

const Log = loadable(() => import("@free/core/screen/SettingLog"), {
  ssr: true,
  fallback: <span>Loading ...</span>,
})

const AppLayout = loadable(() => import("@free/core/component/AppLayout"), {
  ssr: true,
  fallback: <span>Loading ...</span>,
})

const ViewGrid = loadable(() => import("@free/core/screen/ViewGrid"), {
  ssr: true,
  fallback: <span>Loading ...</span>,
})

const NotFound = loadable(() => import("@free/core/screen/PageNotFound"), {
  ssr: true,
  fallback: <span>Loading ...</span>,
})

const User = loadable(() => import("@free/core/screen/SettingUser"), {
  ssr: true,
  fallback: <span>Loading ...</span>,
})

const App = () => {
  return (
    <AppLayout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/log" component={Log} />
        <Route exact path="/user" component={ViewGrid} />
        <Route exact path="/user/:id" component={User} />
        <Route path="*" component={NotFound} />
      </Switch>
    </AppLayout>
  )
}
export default App
