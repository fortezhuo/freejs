import { configApp } from "@free/env"

export const linking: any = {
  prefixes: [`${configApp.name}://`],
  config: {
    initialRouteName: "Home",
    screens: {
      Login: "login",
      Screens: {
        path: "",
        screens: {
          Home: "index",
          ViewSettingUser: "user",
          ViewSettingLog: "log",
          SettingTrash: "trash",
          SettingUser: "user/:id",
        },
      },
    },
  },
}
