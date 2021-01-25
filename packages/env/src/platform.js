const freeEnv = process.env.FREE_ENV || "default"

const platform = {
  local: {
    ios: {
      baseURL: "http://0.0.0.0",
    },
    android: {
      baseURL: "http://10.0.2.2",
    },
  },
  huahua: {
    ios: {
      baseURL: "http://192.168.8.102",
    },
    android: {
      baseURL: "http://192.168.8.102",
    },
  },
  default: {
    ios: {
      baseURL: "http://0.0.0.0",
    },
    android: {
      baseURL: "http://10.0.2.2",
    },
  },
}

module.exports = platform[freeEnv]
