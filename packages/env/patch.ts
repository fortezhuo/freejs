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

// Patch Icon
const patchIcon: { [key: string]: string } = {
  "tab-bar-item-ios": "TabBarItemIOS",
  "toolbar-android": "ToolbarAndroid",
}

Object.keys(patchIcon).forEach((key) => {
  const file = resolve(
    appPath,
    `./node_modules/react-native-vector-icons/lib/${key}.js`
  )
  fs.writeFileSync(
    file,
    `export default function create${patchIcon[key]}Component(
    IconNamePropType,
    getImageSource
  ) {
    return null}`,
    {
      encoding: "utf8",
    }
  )
})

// Patch React Navigation
const fileResourceSavingScene =
  "@react-navigation/drawer/lib/module/views/ResourceSavingScene"
const contentResourceSavingScene = fs.readFileSync(
  resolve(appPath, `./node_modules/${fileResourceSavingScene}.js`),
  "utf8"
)

fs.writeFileSync(
  resolve(appPath, `./node_modules/${fileResourceSavingScene}.web.js`),
  contentResourceSavingScene.replace(`, shouldUseActivityState `, ""),
  {
    encoding: "utf8",
  }
)
