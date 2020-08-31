import React, { FC } from "react"
import { Switch, Route } from "react-router"
import { getRoute } from "@free/core/config/route"
import { random } from "@free/core/util/random"
import { observer } from "mobx-react-lite"
import { useStore } from "../Store"
import _flattenDeep from "lodash/flattenDeep"

export const useRoutes = (Screen: any) => {
  const { app } = useStore()
  const Routes: FC = observer(() => {
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
                  component={Screen.ViewGrid}
                />
              )
            })
          : []
        const routeComponent = route.view
          ? route.path.map((path: string) => {
              return (
                <Route
                  key={"rc_" + random()}
                  exact
                  path={`${path}/:id`}
                  component={Screen[route.component]}
                />
              )
            })
          : route.path.map((path: string) => {
              return (
                <Route
                  key={"rc_" + random()}
                  exact
                  path={path}
                  component={Screen[route.component]}
                />
              )
            })
        return [routeComponent, routeView]
      })
    )

    return (
      <Switch>
        <Route exact path="/" component={Screen.PageHome} />
        <Route exact path="/login" component={Screen.PageLogin} />
        {aRoute}
        <Route path="*" component={Screen.PageNotFound} />
      </Switch>
    )
  })
  return Routes
}
