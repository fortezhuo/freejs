const freeEnv = process.env.FREE_ENV || "default"
const database = {
  local: {
    url: "mongodb://0.0.0.0:27017",
    name: "FreeJS",
  },
  huahua: {
    url: "mongodb://0.0.0.0:27017",
    name: "FreeJS",
  },
  nyanyaw: {
    url: "mongodb://0.0.0.0:27017",
    name: "FreeJS",
  },
  default: {
    url: "mongodb://0.0.0.0:27017",
    name: "FreeJS",
  },
}

module.exports = database[freeEnv]
