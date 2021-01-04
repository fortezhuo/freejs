const user = require("./user").grants
const role = {
  grants: user.concat([
    { resource: "profile", action: ["*"] },
    {
      resource: "workflow",
      action: ["*"],
    },
  ]),
}

module.exports = role
