import fp from "fastify-plugin"
import { ssr } from "./ssr"

const isProd = process.env.NODE_ENV === "production"

export const all = fp(async (instance) => {
  if (isProd) instance.register(ssr)
})
