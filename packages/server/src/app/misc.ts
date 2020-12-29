const logoBanner = `  
    ███████╗██████╗ ███████╗███████╗         ██╗███████╗
    ██╔════╝██╔══██╗██╔════╝██╔════╝         ██║██╔════╝
    █████╗  ██████╔╝█████╗  █████╗           ██║███████╗
    ██╔══╝  ██╔══██╗██╔══╝  ██╔══╝      ██   ██║╚════██║
    ██║     ██║  ██║███████╗███████╗    ╚█████╔╝███████║
    ╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝     ╚════╝ ╚══════╝

🔥 🔥 🔥 🔥 = FORTE REACT EVERYWHERE FOR NODE.JS = 🔥 🔥 🔥 🔥`

const infoDevServer = `
💥 💥 💥 💥 =        D E V E L O P M E N T       = 💥 💥 💥 💥

==============================================================
 Webpack Dev Server : http://0.0.0.0
 Restful API Server : http://0.0.0.0:8000
==============================================================
`
export const loadBanner = (isProd = true) => {
  const color = isProd ? "" : "\x1b[31m"
  console.log(color, logoBanner)
  if (!isProd) {
    console.log(infoDevServer)
  }
  console.log("\x1b", "")
}
