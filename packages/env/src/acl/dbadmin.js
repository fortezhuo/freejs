const common = require("./common")

const role = {
  grants: common.user.concat(common.dbadmin).concat([
    {
      resource: "workflow",
      action: ["*"],
    },
  ]),
}

module.exports = role
