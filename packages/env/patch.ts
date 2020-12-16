import fs from "fs"
import { resolve } from "path"

// Patch Metro
const appPath = process.cwd().substr(0, process.cwd().indexOf("/package"))

const patchMetro = /console.warn\([\s]*`Require cycle[^;]*;/
const pathMetro = resolve(
  appPath,
  "./node_modules/metro/src/lib/polyfills/require.js"
)
const contentMetro = fs.readFileSync(pathMetro, "utf8")

fs.writeFileSync(pathMetro, contentMetro.replace(patchMetro, ""), {
  encoding: "utf8",
})
