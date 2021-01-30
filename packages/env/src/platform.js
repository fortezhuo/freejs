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
      baseURL: "http://192.168.8.101",
    },
    android: {
      baseURL: "http://192.168.8.101",
    },
  },
  nyanyaw: {
    ios: {
      baseURL: "http://192.168.43.6",
    },
    android: {
      baseURL: "http://192.168.43.6",
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
