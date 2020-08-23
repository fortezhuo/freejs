export const menu = [
  {
    label: "Create",
    icon: "file-plus",
    visible: true,
    children: [
      {
        label: "Request",
        icon: "feather",
        path: "/request/new",
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
      },
      {
        label: "View 2",
        icon: "list",
        path: "/view/2",
      },
      {
        label: "View 3",
        icon: "list",
        path: "/view/3",
      },
      {
        label: "View 4",
        icon: "list",
        path: "/view/4",
      },
      {
        label: "View 5",
        icon: "list",
        path: "/view/5",
      },
      {
        label: "View 6",
        icon: "list",
        path: "/view/6",
      },
    ],
  },
  {
    label: "Profile",
    icon: "grid",
    visible: ["read", "profile"],
    children: [
      {
        label: "Profile 1",
        icon: "list",
        path: "/view/1",
      },
      {
        label: "Profile 2",
        icon: "list",
        path: "/view/2",
      },
      {
        label: "Profile 3",
        icon: "list",
        path: "/view/3",
      },
      {
        label: "Profile 4",
        icon: "list",
        path: "/view/4",
      },
      {
        label: "Profile 5",
        icon: "list",
        path: "/view/5",
      },
      {
        label: "Profile 6",
        icon: "list",
        path: "/view/6",
      },
    ],
  },
]
