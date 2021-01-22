const freeEnv = process.env.FREE_ENV || "default"

const cookieAge = 8 * 3600000

const session = {
  local: {
    cookieDomain: "",
    cookieAge,
    secret: "a8b4308001c95e96e4e919d8ac2eecdd0680dce1bf236d154b1c0959d9f3714e",
  },
  huahua: {
    cookieDomain: "",
    cookieAge,
    secret: "a8b4308001c95e96e4e919d8ac2eecdd0680dce1bf236d154b1c0959d9f3714e",
  },
  default: {
    cookieDomain: "",
    cookieAge,
    secret: "a8b4308001c95e96e4e919d8ac2eecdd0680dce1bf236d154b1c0959d9f3714e",
  },
}

module.exports = session[freeEnv]
