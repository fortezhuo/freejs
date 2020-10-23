import { Route } from "@free/core"
import { AppStore } from "../store/appStore"

const getSetting: (visible: boolean, trash: boolean) => Route[] = (
  visible,
  trash
) => {
  return [
    {
      path: ["/trash"],
      component: "SettingTrash",
      view: false,
      trash: false,
      visible: visible,
    },
    {
      path: ["/log"],
      component: "SettingLog",
      view: true,
      trash: false,
      visible: visible,
    },
    {
      path: ["/user"],
      component: "SettingUser",
      view: true,
      trash,
      visible: visible,
    },
  ]
}

const getProfile: (visible: boolean, trash: boolean) => Route[] = (
  visible,
  trash
) => {
  return []
}

export const getRoute: (app: AppStore | undefined) => Route[] = (app) => {
  if (!app) return []

  const canSetting: boolean = app?.can("read", "setting")
  const canProfile: boolean = app?.can("read", "profile")
  const canTrash = canSetting
  const route: Route[] = []
  return route
    .concat(getSetting(canSetting, canTrash))
    .concat(getProfile(canProfile, canTrash))
    .filter((route) => route.visible)
}
