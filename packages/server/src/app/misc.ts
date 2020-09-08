import { configServer } from "@free/env"
import { Banner } from "@free/server"

const logoBanner: string = `  
    ███████╗██████╗ ███████╗███████╗         ██╗███████╗
    ██╔════╝██╔══██╗██╔════╝██╔════╝         ██║██╔════╝
    █████╗  ██████╔╝█████╗  █████╗           ██║███████╗
    ██╔══╝  ██╔══██╗██╔══╝  ██╔══╝      ██   ██║╚════██║
    ██║     ██║  ██║███████╗███████╗    ╚█████╔╝███████║
    ╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝     ╚════╝ ╚══════╝

🔥 🔥 🔥 🔥 = FORTE REACT EVERYWHERE FOR NODE.JS = 🔥 🔥 🔥 🔥`

const infoDevServer: string = `
💥 💥 💥 💥 =        D E V E L O P M E N T       = 💥 💥 💥 💥

==============================================================
 Webpack Dev Server : http://0.0.0.0
 Restful API Server : http://0.0.0.0:8000
==============================================================
`

const infoFirstTime: string = `
🎉 🎉 🎉 🎉 =   F I R S T   T I M E   L I V E   = 🎉 🎉 🎉 🎉

=== PLEASE DISABLE "APP_FIRST_TIME" AFTER CREATE FIRST USER ===`

export const loadBanner: Banner = (isProd = true) => {
  const isFirstTime = configServer.firstTime === "Yes" && isProd
  const color = isProd ? "" : "\x1b[31m"
  console.log(color, logoBanner)
  if (isFirstTime) console.log("\x1b[31m", infoFirstTime)
  if (!isProd) {
    console.log(infoDevServer)
  }
  console.log("\x1b", "")
}
