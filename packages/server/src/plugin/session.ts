import fastifyCookie from "fastify-cookie"
import fastifySession from "fastify-session"
import { configSession } from "@free/env"
import { FastifyInstance, FastifyPlugin } from "fastify"

export const session = async (instance: FastifyInstance) => {
  instance.register(fastifyCookie)
  instance.register(fastifySession as FastifyPlugin<any>, {
    cookieName: "freejsId",
    saveUninitialized: false,
    secret: configSession.secret,
    cookie: {
      secure: false,
      maxAge: configSession.cookieAge,
      domain:
        configSession.cookieDomain !== "" ? configSession.cookieDomain : null,
    },
  })
}
