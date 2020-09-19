import fs from "fs"
import { resolve } from "path"

// Patch Metro
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

// Patch Icon
const patch: { [key: string]: string } = {
  "tab-bar-item-ios": "TabBarItemIOS",
  "toolbar-android": "ToolbarAndroid",
}

Object.keys(patch).forEach((key) => {
  const file = resolve(
    appPath,
    `./node_modules/react-native-vector-icons/lib/${key}.js`
  )
  fs.writeFileSync(
    file,
    `export default function create${patch[key]}Component(
    IconNamePropType,
    getImageSource
  ) {
    return null}`,
    {
      encoding: "utf8",
    }
  )
})
