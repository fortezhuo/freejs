import fp from "fastify-plugin"
import { ssr } from "./ssr"
import { session } from "./session"
import { database } from "./database"
import { router } from "./router"

const isProd = process.env.NODE_ENV === "production"

export const all = fp(async (instance) => {
  instance.register(session).after(() => {
    instance.register(database).after(() => {
      instance.register(router, { prefix: "/api" }).after(() => {
        instance.register(ssr)
      })
    })
  })
})
