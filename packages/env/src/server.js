const freeEnv = process.env.FREE_ENV || "default"

const server = {
  local: {
    host: "0.0.0.0",
    port: 80,
    firstTime: "No",
  },
  default: {
    host: "0.0.0.0",
    port: 8000,
    firstTime: "No",
  },
}

module.exports = server[freeEnv]
