if (typeof window != "undefined") {
  const logoBanner = `%c  
    ███████╗██████╗ ███████╗███████╗         ██╗███████╗
    ██╔════╝██╔══██╗██╔════╝██╔════╝         ██║██╔════╝
    █████╗  ██████╔╝█████╗  █████╗           ██║███████╗
    ██╔══╝  ██╔══██╗██╔══╝  ██╔══╝      ██   ██║╚════██║
    ██║     ██║  ██║███████╗███████╗    ╚█████╔╝███████║
    ╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝     ╚════╝ ╚══════╝

🔥 🔥 🔥 🔥 = FORTE REACT EVERYWHERE FOR NODE.JS = 🔥 🔥 🔥 🔥
`
  console.info(logoBanner, "color: rgb(2,135,206)")

  console.log(
    `%cPlease type syntax "forte" on browser console / inspect element for more information`,
    "color: grey; font-size:11px;"
  )
  window.onkeydown = function (e) {
    if (e.keyCode == 8 && e.target == document.body) e.preventDefault()
  }
}
