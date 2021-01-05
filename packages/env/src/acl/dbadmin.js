const user = require("./user")
const role = user.concat([
  { target: "profile", action: ["*"] },
  {
    target: "workflow",
    action: ["*"],
  },
])

module.exports = role
