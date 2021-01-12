const role = {
  inherit: ["DBAdmin", "User"],
  list: [
    { target: "setting", action: ["*"] },
    {
      target: "acl",
      action: ["*"],
    },
    {
      target: "trash",
      action: ["*"],
    },
    {
      target: "log",
      action: ["*"],
    },
    {
      target: "user",
      action: ["read", "*"],
    },
  ],
}

module.exports = role
