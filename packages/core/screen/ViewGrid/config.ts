// Setting user
export const user = {
  title: "User Management",
  name: "user",
  search: ["username", "fullname"],
  button: [],
  column: [
    { label: "", name: "_id", type: "checkbox" },
    { label: "", name: "_id", type: "link" },
    {
      label: "User Name",
      name: "username",
      filter: true,
      search: ["username"],
      style: { width: 200 },
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
  ],
}
