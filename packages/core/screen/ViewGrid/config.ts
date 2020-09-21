// Setting user
export const log = {
  title: "Log Dummy",
  name: "user",
  search: ["username", "fullname"],
  button: ["new", "delete", "filter"],
  column: [
    {
      label: "",
      name: "name",
      type: "link",
      style: { width: 36, maxWidth: 36 },
      isMobileVisible: true,
    },
    {
      label: "Size",
      name: "size",
      filter: true,
      search: ["size"],
      style: { width: 150 },
      isMobileVisible: true,
    },
  ],
}

// Setting user
export const user = {
  title: "User Management",
  name: "user",
  search: ["username", "fullname"],
  button: ["new", "delete", "filter"],
  column: [
    {
      label: "",
      name: "_id",
      type: "checkbox",
      style: { width: 36, maxWidth: 36 },
      isMobileVisible: false,
    },
    {
      label: "",
      name: "_id",
      type: "link",
      style: { width: 36, maxWidth: 36 },
      isMobileVisible: true,
    },
    {
      label: "User Name",
      name: "username",
      filter: true,
      search: ["username"],
      style: { width: 150 },
      isMobileVisible: true,
    },
    {
      label: "Full Name",
      name: "fullname",
      filter: true,
      search: ["fullname"],
      style: { width: 200 },
      isMobileVisible: true,
    },
    {
      label: "Email",
      name: "email",
      filter: true,
      search: ["email"],
      style: { width: 200 },
      isMobileVisible: true,
    },
    {
      label: "Roles",
      name: "roles",
      filter: true,
      search: ["roles"],
      style: { width: 200 },
      isMobileVisible: true,
    },
    {
      label: "Updated At",
      name: "_updatedAt",
      type: "datetime",
      filter: false,
      style: { width: 200 },
      isMobileVisible: true,
    },
    {
      label: "Updated By",
      name: "_updatedBy",
      filter: ["_updatedBy"],
      style: { width: 200 },
      isMobileVisible: true,
    },
  ],
}
