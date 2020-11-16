const freeEnv = process.env.FREE_ENV || "default"

const proxy = {
  local: "http://0.0.0.0:8000",
  huahua: "http://0.0.0.0:8000",
  default: "http://0.0.0.0:8000",
}

module.exports = proxy[freeEnv]
