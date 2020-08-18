import fastify, { FastifyInstance } from "fastify"
import { Server, IncomingMessage, ServerResponse } from "http"
import { getOptions, loadBanner } from "./misc"
import { all } from "../plugin"
import { configApp, configServer } from "@free/env"

export const boot: Boot = async () => {
  const isProd = process.env.NODE_ENV === "production"
  const options = getOptions()
  const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify(
    options
  )

  try {
    loadBanner(isProd)
    app.log.info(
      `Starting 🔥 ${
        isProd
          ? configApp.displayName + ` ver. ${configApp.version}`
          : "API Server"
      } 🔥 ...`
    )
    app.register(all)

    await app.listen(
      isProd ? configServer.port : 8000,
      isProd ? configServer.host : "0.0.0.0"
    )
  } catch (err) {
    console.log(err)
    app.log.error(err)
    process.exit(1)
  }
}
