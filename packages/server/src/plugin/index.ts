import fp from "fastify-plugin"
import { ssr } from "./ssr"
import { session } from "./session"
import { database } from "./database"

const isProd = process.env.NODE_ENV === "production"

export const all = fp(async (instance) => {
  instance.register(session)
  instance.register(database)
  if (isProd) instance.register(ssr)
})
