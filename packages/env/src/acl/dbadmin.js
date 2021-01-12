const role = {
  inherit: ["User"],
  list: [
    { target: "profile", action: ["*"] },
    {
      target: "workflow",
      action: ["*"],
    },
  ],
}

module.exports = role
