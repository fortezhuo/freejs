import { configApp } from "@free/env"

export const linking: any = {
  prefixes: ["freejs://", "node.rockman.com"],
  config: {
    screens: {
      Screens: "",
      Home: "index",
      Login: "login",
      ViewSettingUser: "user",
      SettingUser: "user/:id",
    },
  },
}
