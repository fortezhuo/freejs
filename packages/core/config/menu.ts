interface SubMenu {
  label: string
  icon: string
  path?: string
  visible: boolean
}

interface Menu extends SubMenu {
  children: SubMenu[]
}

export const getMenu: (app: any) => Menu[] = (app) => {
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
          label: "Workflow",
          icon: "list",
          component: "ViewProfileWorkflow",
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
          label: "Access Control Management",
          icon: "key",
          component: "ViewSettingACL",
          visible: true,
        },
        {
          label: "Trash Management",
          icon: "trash-2",
          component: "ViewSettingTrash",
          visible: true,
        },
        {
          label: "Log Management",
          icon: "archive",
          component: "ViewSettingLog",
          visible: true,
        },
        {
          label: "User Management",
          icon: "user",
          component: "ViewSettingUser",
          visible: true,
        },
      ],
    },
  ] as any)
}
