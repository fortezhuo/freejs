// Profile Workflow
export const ViewProfileWorkflow = {
  name: "workflow",
  search: ["parameter", "fullname", "email"],
  fields: [],
  actions: ["New", "Delete", "Search"],
  columns: [
    {
      label: "",
      name: "_id",
      type: "link",
      style: { width: 36 },
    },
    {
      label: "Parameter",
      name: "parameter",
      filter: true,
      search: ["parameter"],
      style: { width: 150 },
    },
    {
      label: "Status",
      name: "status",
      filter: true,
      search: ["status"],
      style: { width: 300 },
    },
    {
      label: "Completed Status",
      name: "completedStatus",
      filter: true,
      search: ["completedStatus"],
      style: { width: 300 },
    },
  ],
}

// Setting ACL
export const ViewSettingAccess = {
  name: "access",
  fields: ["-data"],
  search: ["$text"],
  actions: ["New", "Delete", "Search"],
  columns: [
    {
      label: "",
      name: "_id",
      filter: false,
      type: "link",
      style: { width: 30 },
    },
    {
      label: "Role",
      name: "role",
      filter: true,
      search: ["role"],
      style: { width: 200 },
    },
    {
      label: "Inherit",
      name: "inherit",
      filter: true,
      search: ["inherit"],
      style: { width: 200 },
    },
    {
      label: "Target",
      name: "target",
      filter: true,
      search: ["target"],
      style: { width: 300 },
    },
  ],
}

// Setting Trash
export const ViewSettingTrash = {
  name: "trash",
  fields: ["-data"],
  search: ["$text"],
  actions: ["Restore", "Delete", "Search"],
  columns: [
    {
      label: "",
      name: "_id",
      filter: false,
      type: "json",
      search: ["$text"],
      style: { width: 30 },
    },
    {
      label: "Collection",
      name: "_deletedFrom",
      filter: true,
      search: ["_deletedFrom"],
      style: { width: 200 },
    },
    {
      label: "Deleted By",
      name: "_deletedBy",
      filter: true,
      search: ["_deletedBy"],
      style: { width: 200 },
    },
    {
      label: "Deleted At",
      name: "_deletedAt",
      filter: true,
      type: "datetime",
      search: ["_deletedAt"],
      style: { width: 300 },
    },
  ],
}

// Setting Log
export const ViewSettingLog = {
  name: "log",
  fields: [],
  search: [],
  actions: [],
  columns: [
    {
      label: "",
      name: "name",
      type: "download_log",
      style: { width: 36 },
    },
    {
      label: "Log",
      name: "name",
      type: "string",
      style: { width: 150 },
    },
    {
      label: "Size",
      name: "size",
      filter: false,
      search: ["size"],
      style: { width: 150 },
    },
    {
      label: "Last Modified",
      name: "mtime",
      style: { width: 200 },
      type: "datetime",
    },
  ],
}

// Setting user
export const ViewSettingUser = {
  name: "user",
  search: ["username", "fullname", "email"],
  fields: [],
  actions: ["New", "Delete", "Search"],
  columns: [
    {
      label: "",
      name: "_id",
      type: "link",
      style: { width: 36 },
    },
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
      style: { width: 300 },
    },
    {
      label: "Email",
      name: "email",
      filter: true,
      search: ["email"],
      style: { width: 300 },
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
      name: "_updatedAt",
      type: "datetime",
      filter: false,
      style: { width: 200 },
    },
    {
      label: "Updated By",
      name: "_updatedBy",
      filter: ["_updatedBy"],
      style: { width: 200 },
    },
  ],
}
