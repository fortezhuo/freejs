const common = require("./common")

const role = {
  grants: common.user.concat({
    resource: "user",
    action: ["read"],
    attributes: ["*"],
  }),
}

module.exports = role
