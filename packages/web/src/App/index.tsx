import React from "react"
import loadable from "@loadable/component"
import { Switch, Route } from "react-router-dom"

const Home = loadable(() => import("@free/core/screen/Home"), {
  ssr: true,
  fallback: <span>Loading ...</span>,
})

const Login = loadable(() => import("@free/core/screen/Login"), {
  ssr: true,
  fallback: <span>Loading ...</span>,
})

const FreeView = loadable(() => import("@free/core/screen/FreeView"), {
  ssr: true,
  fallback: <span>Loading ...</span>,
})

const AppLayout = loadable(() => import("@free/core/component/AppLayout"), {
  ssr: true,
  fallback: <span>Loading ...</span>,
})

const NotFound = loadable(() => import("@free/core/screen/NotFound"), {
  ssr: true,
  fallback: <span>Loading ...</span>,
})

const App = () => {
  return (
    <AppLayout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/view" component={FreeView} />
        <Route path="*" component={NotFound} />
      </Switch>
    </AppLayout>
  )
}
export default App
