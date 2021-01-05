const role = [
  { target: "create", action: ["*"] },
  { target: "view", action: ["*"] },
  { target: "setting", action: ["*"] },
  {
    target: "workflow",
    action: ["read"],
  },
  {
    target: "user",
    action: ["read"],
  },
]

module.exports = role
