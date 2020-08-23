const User = require("./user")
const Admin = require("./admin")
const DBAdmin = require("./dbadmin")

const acl = {
  Admin,
  DBAdmin,
  User,
}

module.exports = acl
