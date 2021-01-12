const role = {
  list: [
    { target: "create", action: ["*"] },
    { target: "view", action: ["*"] },
    {
      target: "workflow",
      action: ["read"],
    },
    {
      target: "user",
      action: ["read"],
    },
  ],
}

module.exports = role
