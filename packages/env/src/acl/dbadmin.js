const common = require("./common")

const role = {
  grants: common.user.concat(common.dbadmin),
}

module.exports = role