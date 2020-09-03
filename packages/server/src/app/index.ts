import fastify, { FastifyInstance } from "fastify"
import { Server, IncomingMessage, ServerResponse } from "http"
import { loadBanner } from "./misc"
import { all } from "../plugin"
import { configApp, configServer } from "@free/env"
import { Boot } from "@free/server"
//import { mailer } from "../util/mailer"

export const boot: Boot = async () => {
  const isProd = process.env.NODE_ENV === "production"
  const isDevMobile = process.env.MOBILE === "development"
  /*
  await mailer({
    from: "Raps Foo 👻", // sender address
    to: "rap.sherlock@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world ?", // plain text body
    html: "<b>Hello world ?</b>", // html body
  })
  */

  const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify(
    {
      disableRequestLogging: true,
      pluginTimeout: 999999,
      logger: true,
    }
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
      isProd ? configServer.port : isDevMobile ? 80 : 8000,
      isProd ? configServer.host : "0.0.0.0"
    )
  } catch (err) {
    app.log.fatal(err)
    process.exit(1)
  }
}
