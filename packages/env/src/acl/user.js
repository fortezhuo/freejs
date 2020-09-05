const common = require("./common")

const role = {
  grants: common.user.concat({
    resource: "user",
    action: ["read"],
    attributes: ["-created_at", "-updated_at"],
  }),
}

module.exports = role
