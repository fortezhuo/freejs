import { configApp } from "@free/env"

export const words = /Setting|View/gi

export const linking: any = {
  prefixes: [`${configApp.name}://`],
  config: {
    initialRouteName: "Home",
    screens: {
      Login: "login",
      Screens: {
        path: "",
        screens: {
          Index: "index",
          ViewSettingUser: "user",
          ViewSettingLog: "log",
          SettingTrash: "trash",
          SettingUser: "user/:id",
        },
      },
    },
  },
}
