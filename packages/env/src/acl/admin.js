const role = {
  grants: [
    {
      resource: "log",
      action: ["*"],
      attributes: ["*"],
    },
    {
      resource: "user",
      action: ["*"],
      attributes: ["*"],
    },
  ],
}

module.exports = role
