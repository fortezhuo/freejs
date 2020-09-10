const user = [
  { resource: "attach", action: ["*"] },
  { resource: "create", action: ["*"] },
  { resource: "view", action: ["*"] },
]

const dbadmin = [{ resource: "profile", action: ["*"] }]

const admin = [{ resource: "setting", action: ["*"] }]

module.exports = {
  user,
  dbadmin,
  admin,
}
