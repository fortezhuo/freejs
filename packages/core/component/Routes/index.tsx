import React, { FC } from "react"
import { Switch, Route } from "react-router"
import { getRoute } from "@free/core/config/route"
import { random } from "@free/core/util/random"
import { observer } from "mobx-react-lite"
import { useStore } from "../Store"
import _flattenDeep from "lodash/flattenDeep"

const Routes: FC<{ screen: any }> = observer(({ screen }) => {
  const { app } = useStore()
  const routes = getRoute(app.auth && app)
  const aRoute = _flattenDeep(
    routes.map((route, i) => {
      const routeView = route.view
        ? route.path.map((path: string) => {
            return (
              <Route
                key={"rv_" + random()}
                exact
                path={path}
                component={screen.ViewGrid}
              />
            )
          })
        : []
      const routeComponent = route.view
        ? route.path.map((path: string) => {
            return [
              <Route
                key={"rc_" + random()}
                exact
                path={`${path}/:id`}
                component={screen[route.component]}
              />,
            ].concat(
              route.trash
                ? [
                    <Route
                      key={"rt_" + random()}
                      exact
                      path={`/trash${path}`}
                      component={screen.SettingTrash}
                    />,
                    <Route
                      key={"rtc_" + random()}
                      exact
                      path={`/trash${path}/:id`}
                      component={screen[route.component]}
                    />,
                  ]
                : []
            )
          })
        : route.path.map((path: string) => {
            return (
              <Route
                key={"rc_" + random()}
                exact
                path={path}
                component={screen[route.component]}
              />
            )
          })

      return [routeComponent, routeView]
    })
  )

  return (
    <Switch>
      <Route exact path="/" component={screen.PageHome} />
      <Route exact path="/login" component={screen.PageLogin} />
      {aRoute}
    </Switch>
  )
})

export default Routes

/*
      <Route exact path="/" component={screen.PageHome} />
      <Route exact path="/login" component={screen.PageLogin} />
      <Route exact path="/error" component={screen.PageError} />
      {aRoute}
      <Route path="*" component={screen.PageNotFound} />
*/
