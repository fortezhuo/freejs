const freeEnv = process.env.FREE_ENV || "default"

const session = {
  local: {
    cookieDomain: "",
    cookieAge: 86409000,
    secret: "1I9gNIGjRjjeEFlvfBfX92ouON99ZTaOowUuBA32bhPOLAz4h1",
  },
  huahua: {
    cookieDomain: "",
    cookieAge: 86409000,
    secret: "1I9gNIGjRjjeEFlvfBfX92ouON99ZTaOowUuBA32bhPOLAz4h1",
  },
  default: {
    cookieDomain: "",
    cookieAge: 86409000,
    secret: "1I9gNIGjRjjeEFlvfBfX92ouON99ZTaOowUuBA32bhPOLAz4h1",
  },
}

module.exports = session[freeEnv]
