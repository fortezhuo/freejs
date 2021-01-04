const role = {
  grants: [
    { resource: "create", action: ["*"] },
    { resource: "view", action: ["*"] },
    { resource: "profile", action: ["*"] },
    { resource: "setting", action: ["*"] },
    {
      resource: "workflow",
      action: ["read"],
      attributes: ["*"],
    },
    {
      resource: "user",
      action: ["read"],
      attributes: ["*"],
    },
  ],
}

module.exports = role
