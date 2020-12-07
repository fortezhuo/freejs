import { configApp } from "@free/env"

export const words = /Setting|View/gi

export const linking: any = {
  prefixes: [`${configApp.name}://`],
  config: {
    initialRouteName: "Index",
    screens: {
      Login: "login",
      Drawer: {
        path: "",
        screens: {
          Index: "index",
          ViewSettingUser: "user",
          ViewSettingLog: "log",
          ViewSettingTrash: "trash",
        },
      },
      SettingUser: "user/:id",
    },
  },
}
