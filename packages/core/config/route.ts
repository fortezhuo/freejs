import { Route } from "@free/core"
import { AppStore } from "../store/appStore"

const getSetting: (visible: boolean) => Route[] = (visible) => {
  return [
    {
      name: "SettingTrash",
      title: "Trash Management",
      view: true,
      child: false,
      visible: visible,
    },
    {
      name: "SettingLog",
      title: "Log Management",
      view: true,
      child: false,
      visible: visible,
    },
    {
      name: "SettingUser",
      title: "User Management",
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
