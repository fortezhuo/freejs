const common = require("./common")

const role = {
  grants: common.user
    .concat(common.dbadmin)
    .concat(common.admin)
    .concat([
      ({
        resource: "log",
        action: ["*"],
      },
      {
        resource: "user",
        action: ["*"],
      }),
    ]),
}

module.exports = role
