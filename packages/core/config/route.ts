interface Route {
  name: string
  title: string
  view: string | boolean
  child: string | boolean
  visible: boolean
}

const getSetting: (visible: boolean) => Route[] = (visible) => {
  return [
    {
      name: "SettingAccess",
      title: "Access Management",
      view: "access",
      child: "access/:id",
      visible: visible,
    },
    {
      name: "SettingTrash",
      title: "Trash Management",
      view: "trash",
      child: false,
      visible: visible,
    },
    {
      name: "SettingLog",
      title: "Log Management",
      view: "log",
      child: false,
      visible: visible,
    },
    {
      name: "SettingUser",
      title: "User Management",
      view: "user",
      child: "user/:id",
      visible: visible,
    },
  ]
}

const getProfile: (visible: boolean) => Route[] = (visible) => {
  return [
    {
      name: "ProfileWorkflow",
      title: "Profile Workflow",
      view: "workflow",
      child: "workflow/:id",
      visible: visible,
    },
  ]
}

export const getRoute: (app: any) => Route[] = (app) => {
  const canSetting: boolean = app.can("read", "SETTING")
  const canProfile: boolean = app.can("read", "PROFILE")

  const route: Route[] = []
  return route
    .concat(getSetting(canSetting))
    .concat(getProfile(canProfile))
    .filter((route) => route.visible)
}
