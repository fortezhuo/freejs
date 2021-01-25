const freeEnv = process.env.FREE_ENV || "default"
const gdrive = {
  local: {
    client_id:
      "82129318965-4mt1kk5f7p6jhh4h1jtoml8d7ueahnn4.apps.googleusercontent.com",
    client_secret: "0MOqM10ArTcwb_SqWQnsqZp-",
    redirect_uris: ["http://node.rockman.com/api/upload/gdrive/token"],
    stored_token: "./packages/env/misc/token.json",
    scope: ["https://www.googleapis.com/auth/drive"],
  },
  huahua: {
    client_id:
      "82129318965-4mt1kk5f7p6jhh4h1jtoml8d7ueahnn4.apps.googleusercontent.com",
    client_secret: "0MOqM10ArTcwb_SqWQnsqZp-",
    redirect_uris: ["http://node.rockman.com/api/upload/gdrive/token"],
    stored_token: "./packages/env/misc/token.json",
    scope: ["https://www.googleapis.com/auth/drive"],
  },
  nyanyaw: {
    client_id:
      "82129318965-4mt1kk5f7p6jhh4h1jtoml8d7ueahnn4.apps.googleusercontent.com",
    client_secret: "0MOqM10ArTcwb_SqWQnsqZp-",
    redirect_uris: ["http://node.rockman.com/api/upload/gdrive/token"],
    stored_token: "./packages/env/misc/token.json",
    scope: ["https://www.googleapis.com/auth/drive"],
  },
  default: {
    client_id:
      "82129318965-4mt1kk5f7p6jhh4h1jtoml8d7ueahnn4.apps.googleusercontent.com",
    client_secret: "0MOqM10ArTcwb_SqWQnsqZp-",
    redirect_uris: ["http://node.rockman.com/api/upload/gdrive/token"],
    stored_token: "./packages/env/misc/token.json",
    scope: ["https://www.googleapis.com/auth/drive"],
  },
}

module.exports = gdrive[freeEnv]
