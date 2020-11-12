import { Menu } from "@free/core"
import { app } from "../store"

export const getMenu: () => any[] = () => {
  const canProfile = app.can("read", "profile")
  const canSetting = app.can("read", "setting")
  return [
    {
      label: "Create",
      icon: "file-plus",
      visible: true,
      children: [
        {
          label: "Request",
          icon: "feather",
          path: "/request/new",
          visible: true,
        },
      ],
    },
    {
      label: "View",
      icon: "grid",
      visible: true,
      children: [
        {
          label: "View 1",
          icon: "list",
          path: "/view",
          visible: true,
        },
        {
          label: "View 2",
          icon: "list",
          path: "/view2/2",
          visible: true,
        },
        {
          label: "View 3",
          icon: "list",
          path: "/view3/3",
          visible: true,
        },
        {
          label: "View 4",
          icon: "list",
          path: "/view4/4",
          visible: true,
        },
        {
          label: "View 5",
          icon: "list",
          path: "/view5/5",
          visible: true,
        },
        {
          label: "View 6",
          icon: "list",
          path: "/view6/6",
          visible: true,
        },
      ],
    },
    {
      label: "Profile",
      icon: "grid",
      visible: canProfile,
      children: [
        {
          label: "Profile 1",
          icon: "list",
          path: "/view/1",
          visible: true,
        },
        {
          label: "Profile 2",
          icon: "list",
          path: "/view/2",
          visible: true,
        },
        {
          label: "Profile 3",
          icon: "list",
          path: "/view/3",
          visible: true,
        },
        {
          label: "Profile 4",
          icon: "list",
          path: "/view/4",
          visible: true,
        },
        {
          label: "Profile 5",
          icon: "list",
          path: "/view/5",
          visible: true,
        },
        {
          label: "Profile 6",
          icon: "list",
          path: "/view/6",
          visible: true,
        },
      ],
    },
  ].concat([
    {
      label: "Setting",
      icon: "settings",
      visible: canSetting,
      children: [
        {
          label: "Trash",
          icon: "trash-2",
          component: "SettingTrash",
          visible: true,
        },
        {
          label: "Log",
          icon: "archive",
          path: "/log",
          visible: true,
        },
        {
          label: "User",
          icon: "user",
          component: "ViewSettingUser",
          visible: true,
        },
      ],
    },
  ] as any)
}
