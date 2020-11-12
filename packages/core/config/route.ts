import { Route } from "@free/core"
import { AppStore } from "../store/appStore"

const getSetting: (visible: boolean) => Route[] = (visible) => {
  return [
    {
      name: "SettingTrash",
      view: false,
      child: true,
      visible: visible,
    },
    {
      name: "SettingLog",
      view: true,
      child: false,
      visible: visible,
    },
    {
      name: "SettingUser",
      view: true,
      child: true,
      visible: visible,
    },
  ]
}

const getProfile: (visible: boolean) => Route[] = (visible) => {
  return []
}

export const getRoute: (app: AppStore | undefined) => Route[] = (app) => {
  if (!app) return []

  const canSetting: boolean = app?.can("read", "setting")
  const canProfile: boolean = app?.can("read", "profile")
  const route: Route[] = []
  return route
    .concat(getSetting(canSetting))
    .concat(getProfile(canProfile))
    .filter((route) => route.visible)
}
