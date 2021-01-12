import fp from "fastify-plugin"
import fastifyCookie from "fastify-cookie"
import fastifySession from "fastify-session"
import { configSession, configApp } from "@free/env"
import { FastifyInstance, FastifyPlugin } from "fastify"

export const session = fp(async (instance: FastifyInstance) => {
  instance.register(fastifyCookie)
  instance.register(fastifySession as FastifyPlugin<any>, {
    cookieName: `${configApp.name.toLowerCase()}Id`,
    saveUninitialized: false,
    secret: configSession.secret,
    cookie: {
      secure: false,
      sameSite: true,
      maxAge: configSession.cookieAge,
      domain:
        configSession.cookieDomain !== "" ? configSession.cookieDomain : null,
    },
  })
})
