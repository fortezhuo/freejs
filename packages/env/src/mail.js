const freeEnv = process.env.FREE_ENV || "default"
const mail = {
  local: {
    host: "0.0.0.0",
    port: 8587,
    secure: false,
    pool: false,
    auth: {
      user: "admin@localhost",
      pass: "password",
    },
  },
  huahua: {
    host: "0.0.0.0",
    port: 8587,
    secure: false,
    pool: false,
    auth: {
      user: "admin@localhost",
      pass: "password",
    },
  },
  default: {
    host: "0.0.0.0",
    port: 8587,
    secure: false,
    pool: false,
    auth: {
      user: "admin@localhost",
      pass: "password",
    },
  },
}

module.exports = mail[freeEnv]
