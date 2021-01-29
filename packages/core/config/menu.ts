import { random } from "../util"

interface SubMenu {
  label: string
  key: string
  icon: string
  path?: string
  visible: boolean
}

interface Menu extends SubMenu {
  children: SubMenu[]
}

export const getMenu: (app: any) => Menu[] = (app) => {
  const canProfile = app.can("read", "PROFILE")
  const canSetting = app.can("read", "SETTING")
  return [
    {
      label: "Create",
      key: `menu_${random()}`,
      icon: "file-plus",
      visible: true,
      children: [
        {
          label: "Request",
          key: `sub_${random()}`,
          icon: "pen",
          component: "FormRequest",
          params: { id: "new" },
          visible: true,
        },
      ],
    },
    {
      label: "View",
      key: `menu_${random()}`,
      icon: "grid-3x3-gap",
      visible: true,
      children: [
        {
          label: "Request",
          key: `sub_${random()}`,
          icon: "list-task",
          component: "ViewFormRequest",
          visible: true,
        },
      ],
    },
    {
      label: "Profile",
      icon: "grid-3x3-gap",
      key: `menu_${random()}`,
      visible: canProfile,
      children: [
        {
          label: "Workflow",
          key: `sub_${random()}`,
          icon: "list-task",
          component: "ViewProfileWorkflow",
          visible: true,
        },
      ],
    },
  ].concat([
    {
      label: "Setting",
      icon: "gear",
      key: `menu_${random()}`,
      visible: canSetting,
      children: [
        {
          label: "Access Management",
          key: `sub_${random()}`,
          icon: "key",
          component: "ViewSettingAccess",
          visible: true,
        },
        {
          label: "Trash Management",
          key: `sub_${random()}`,
          icon: "trash",
          component: "ViewSettingTrash",
          visible: true,
        },
        {
          label: "Log Management",
          key: `sub_${random()}`,
          icon: "archive",
          component: "ViewSettingLog",
          visible: true,
        },
        {
          label: "User Management",
          key: `sub_${random()}`,
          icon: "person",
          component: "ViewSettingUser",
          visible: true,
        },
      ],
    },
  ] as any)
}
