const freeEnv = process.env.FREE_ENV || "default"

const cookieAge = 8 * 3600000

const session = {
  local: {
    cookieDomain: "",
    cookieAge,
    secret: "1I9gNIGjRjjeEFlvfBfX92ouON99ZTaOowUuBA32bhPOLAz4h1",
  },
  huahua: {
    cookieDomain: "",
    cookieAge,
    secret: "1I9gNIGjRjjeEFlvfBfX92ouON99ZTaOowUuBA32bhPOLAz4h1",
  },
  default: {
    cookieDomain: "",
    cookieAge,
    secret: "1I9gNIGjRjjeEFlvfBfX92ouON99ZTaOowUuBA32bhPOLAz4h1",
  },
}

module.exports = session[freeEnv]
