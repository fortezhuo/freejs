// Setting user
export const user = {
  title: "User Management",
  name: "user",
  search: ["username", "fullname"],
  button: ["new", "delete", "search"],
  column: [
    { label: "", name: "_id", type: "checkbox" },
    { label: "", name: "_id", type: "link" },
    {
      label: "User Name",
      name: "username",
      filter: true,
      search: ["username"],
      style: { width: 150 },
    },
    {
      label: "Full Name",
      name: "fullname",
      filter: true,
      search: ["fullname"],
      style: { width: 200 },
    },
    {
      label: "Email",
      name: "email",
      filter: true,
      search: ["email"],
      style: { width: 200 },
    },
    {
      label: "Roles",
      name: "roles",
      filter: true,
      search: ["roles"],
      style: { width: 200 },
    },
    {
      label: "Updated At",
      name: "updated_at",
      type: "datetime",
      filter: false,
      style: { width: 200 },
    },
    {
      label: "Updated By",
      name: "updated_by",
      filter: ["updated_by"],
      style: { width: 200 },
    },
  ],
}
