const dbadmin = require("./dbadmin")

const role = dbadmin.concat([
  { target: "setting", action: ["*"] },
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
    action: ["*"],
  },
])

module.exports = role
