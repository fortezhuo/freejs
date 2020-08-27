import fs from "fs"

let appPath = fs.realpathSync(process.cwd())
appPath = appPath.substring(
  0,
  appPath.indexOf("/packages") < 0
    ? appPath.length
    : appPath.indexOf("/packages")
)

export { appPath }
