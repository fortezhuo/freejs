const freeEnv = process.env.FREE_ENV || "default"
const mail = {
  local: {
    host: "0.0.0.0",
    port: 25,
    secure: false,
    auth: {
      user: "admin@0.0.0.0",
      pass: "password",
    },
  },
  default: {
    host: "0.0.0.0",
    port: 8587,
    secure: false,
    auth: {
      user: "admin@localhost",
      pass: "password",
    },
  },
}

module.exports = mail[freeEnv]
