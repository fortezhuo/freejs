import { Route } from "@free/core"
import { AppStore } from "../store/appStore"

const getSetting: (visible: boolean) => Route[] = (visible: boolean) => {
  return [
    { path: ["/log"], component: "SettingLog", view: false, visible: visible },
    {
      path: ["/user"],
      component: "SettingUser",
      view: true,
      visible: visible,
    },
  ]
}

export const getRoute: (app: AppStore | undefined) => Route[] = (app) => {
  if (!app) return []

  const canSetting: boolean = app?.can("read", "setting")
  const route: Route[] = []
  return route.concat(getSetting(canSetting)).filter((route) => route.visible)
}
