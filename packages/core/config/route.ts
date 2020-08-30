import { Route } from "@free/core"
import { app } from "../store"

const getSetting: (visible: boolean) => Route[] = (visible: boolean) => {
  return [
    { path: ["/log"], form: false, view: false, visible: visible },
    {
      path: ["/user/:id", "/user/new"],
      form: "SettingUser",
      view: true,
      visible: visible,
    },
  ]
}

export const getRoute: () => Route[] = () => {
  const canSetting: boolean = app.can("read", "setting")
  const route: Route[] = []

  return route.concat(getSetting(canSetting)).filter((route) => route.visible)
}
