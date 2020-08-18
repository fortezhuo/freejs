const freeEnv = process.env.FREE_ENV || "default"
const database = {
  local: {
    url: "mongodb://0.0.0.0:27017",
    app: "FreeJS",
    trash: "FreeJS_Trash",
  },
  default: {
    url: "mongodb://0.0.0.0:27017",
    app: "FreeJS",
    trash: "FreeJS_Trash",
  },
}

module.exports = database[freeEnv]
