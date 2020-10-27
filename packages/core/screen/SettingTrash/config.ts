// Setting user
export const trash = {
  title: "Trash Management",
  search: ["username", "fullname", "email"],
  button: ["new", "delete", "filter"],
  column: [
    {
      label: "",
      name: "_id",
      type: "link",
      path: "trash",
      style: { width: 36, maxWidth: 36, marginTop: 1 },
      isMobileVisible: true,
    },
    {
      label: "Data",
      name: "data",
      filter: true,
      search: ["data"],
      style: { width: 300 },
      isMobileVisible: true,
    },
    {
      label: "Deleted By",
      name: "_deletedBy",
      filter: true,
      search: ["_deletedBy"],
      style: { width: 150 },
      isMobileVisible: true,
    },
    {
      label: "Deleted At",
      name: "_deletedAt",
      filter: true,
      search: [],
      style: { width: 300 },
      isMobileVisible: true,
    },
  ],
}
