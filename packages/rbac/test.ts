import RBAC from "./"

const options = {
  Admin: [
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
  ],
  User: [
    { resource: "create", action: ["*"] },
    { resource: "view", action: ["*"] },
    {
      resource: "workflow",
      action: ["read"],
      attributes: ["*"],
    },
    {
      resource: "user",
      action: ["read"],
      attributes: ["*"],
    },
  ],
}

const rbac = new RBAC(options)

rbac.register(["User"])
console.log("read user", rbac.can("read", "user"))
console.log("read workflow", rbac.can("read", "user"))
console.log("read trash", rbac.can("read", "trash"))
console.log("read log", rbac.can("read", "log"))
console.log("read user", rbac.can("read", "user"))
console.log("read workflow", rbac.can("read", "user"))
console.log("read trash", rbac.can("read", "trash"))
console.log("read log", rbac.can("read", "log"))
console.log("read user", rbac.can("read", "user"))
console.log("read workflow", rbac.can("read", "user"))
console.log("read trash", rbac.can("read", "trash"))
console.log("read log", rbac.can("read", "log"))
console.log("read user", rbac.can("read", "user"))
console.log("read workflow", rbac.can("read", "user"))
console.log("read trash", rbac.can("read", "trash"))
console.log("read log", rbac.can("read", "log"))
console.log("read user", rbac.can("read", "user"))
console.log("read workflow", rbac.can("read", "user"))
console.log("read trash", rbac.can("read", "trash"))
console.log("read log", rbac.can("read", "log"))
console.log("read user", rbac.can("read", "user"))
console.log("read workflow", rbac.can("read", "user"))
console.log("read trash", rbac.can("read", "trash"))
console.log("read log", rbac.can("read", "log"))
