import React from "react"
import { NativeRouter, Switch, Route } from "react-router-native"
import AppLayout from "@free/core/component/AppLayout"
import Home from "@free/core/screen/Home"
import Login from "@free/core/screen/Login"
import FreeView from "@free/core/screen/FreeView"
import NotFound from "@free/core/screen/NotFound"

export default () => {
  return (
    <NativeRouter>
      <AppLayout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/view" component={FreeView} />
          <Route path="*" component={NotFound} />
        </Switch>
      </AppLayout>
    </NativeRouter>
  )
}
