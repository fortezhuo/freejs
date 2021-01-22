import fp from "fastify-plugin"
import fastifySession from "fastify-secure-session"
import { configSession, configApp } from "@free/env"
import { FastifyInstance } from "fastify"

export const session = fp(async (instance: FastifyInstance) => {
  instance.register(fastifySession as any, {
    cookieName: `${configApp.name.toLowerCase()}Id`,
    key: Buffer.from(configSession.secret, "hex"),
    cookie: {
      path: "/",
      secure: false,
      sameSite: true,
      maxAge: configSession.cookieAge,
      domain:
        configSession.cookieDomain !== "" ? configSession.cookieDomain : null,
    },
  })
})
