import fp from "fastify-plugin"
import { ssr } from "./ssr"
import { session } from "./session"
import { database } from "./database"
import { router } from "./router"

const isProd = process.env.NODE_ENV === "production"

export const all = fp(async (instance) => {
  instance.register(session)
  instance.register(database)
  instance.register(router, { prefix: isProd ? "/api" : "/" })
  if (isProd) instance.register(ssr)
})
