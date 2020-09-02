import fs from "fs"
import { resolve } from "path"

const appPath = process.cwd().substr(0, process.cwd().indexOf("/package"))
const codeToObscure = /console.warn\([\s]*`Require cycle[^;]*;/
const problemFilePath = resolve(
  appPath,
  "./node_modules/metro/src/lib/polyfills/require.js"
)
const problemFileContent = fs.readFileSync(problemFilePath, "utf8")

fs.writeFileSync(
  problemFilePath,
  problemFileContent.replace(codeToObscure, ""),
  { encoding: "utf8" }
)
