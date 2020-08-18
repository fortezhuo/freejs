import fp from "fastify-plugin"
import fastifyCookie from "fastify-cookie"
import fastifySession from "fastify-session"
import { configSession } from "@free/env"

export const session = fp(async (instance) => {
  instance.register(fastifyCookie)
  instance.register(fastifySession as any, {
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
})
