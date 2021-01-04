const role = {
  grants: [
    { resource: "create", action: ["*"] },
    { resource: "view", action: ["*"] },
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
