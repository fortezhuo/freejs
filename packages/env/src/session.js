const freeEnv = process.env.FREE_ENV || "default"

const session = {
  local: {
    cookieDomain: "",
    cookieAge: 144000,
    secret: "1I9gNIGjRjjeEFlvfBfX92ouON99ZTaOowUuBA32bhPOLAz4h1",
  },
  default: {
    cookieDomain: "",
    cookieAge: 144000,
    secret: "1I9gNIGjRjjeEFlvfBfX92ouON99ZTaOowUuBA32bhPOLAz4h1",
  },
}

module.exports = session[freeEnv]
