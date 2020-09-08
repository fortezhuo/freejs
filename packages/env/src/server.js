const freeEnv = process.env.FREE_ENV || "default"

const server = {
  local: {
    host: "0.0.0.0",
    port: 80,
  },
  default: {
    host: "0.0.0.0",
    port: 80,
  },
}

module.exports = server[freeEnv]
