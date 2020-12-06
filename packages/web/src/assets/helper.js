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
  function captureBackspace(e) {
    var rx = /INPUT|SELECT|TEXTAREA/i

    if (e.which == 8) {
      // 8 == backspace
      if (e.target.getAttribute("contenteditable") !== null) return

      if (
        !rx.test(e.target.tagName) ||
        e.target.disabled ||
        e.target.readOnly
      ) {
        e.preventDefault()
      }
    }
  }

  if (window.addEventListener)
    window.addEventListener("keydown", captureBackspace, true)
  else if (document.attachEvent)
    document.attachEvent("onkeydown", captureBackspace)
  else
    document.addEventListener("keydown", captureBackspace, true)

    //
  ;(function () {
    if (typeof window.CustomEvent === "function") return false // If not IE
    function CustomEvent(event, params) {
      params = params || { bubbles: false, cancelable: false, detail: null }
      var evt = document.createEvent("CustomEvent")
      evt.initCustomEvent(
        event,
        params.bubbles,
        params.cancelable,
        params.detail
      )
      return evt
    }
    window.CustomEvent = CustomEvent
  })()
  ;(function () {
    history.pushState = (function (f) {
      return function pushState() {
        var ret = f.apply(this, arguments)
        window.dispatchEvent(new CustomEvent("pushState"))
        window.dispatchEvent(new CustomEvent("locationchange"))
        return ret
      }
    })(history.pushState)
    history.replaceState = (function (f) {
      return function replaceState() {
        var ret = f.apply(this, arguments)
        window.dispatchEvent(new CustomEvent("replaceState"))
        window.dispatchEvent(new CustomEvent("locationchange"))
        return ret
      }
    })(history.replaceState)
    window.addEventListener("popstate", function () {
      window.dispatchEvent(new CustomEvent("locationchange"))
    })
  })()
}
