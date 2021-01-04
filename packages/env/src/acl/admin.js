const dbadmin = require("./dbadmin").grants

const role = {
  grants: dbadmin.concat([
    { resource: "setting", action: ["*"] },
    {
      resource: "trash",
      action: ["*"],
    },
    {
      resource: "log",
      action: ["*"],
    },
    {
      resource: "user",
      action: ["*"],
    },
  ]),
}

module.exports = role
