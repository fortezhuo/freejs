const role = {
  grants: [
    {
      resource: "user",
      action: ["read"],
      attributes: ["*"],
    },
  ],
}

module.exports = role
