import fs from "fs"
import fp from "fastify-plugin"
import React from "react"
import fastifyStatic from "fastify-static"
import fastifyFavicon from "fastify-favicon"
import fastifyCompress from "fastify-compress"
import { resolve } from "path"
import { renderToString } from "react-dom/server"
import { ChunkExtractor } from "@loadable/server"
import { Request, Reply } from "@free/server"

const isProd = process.env.NODE_ENV === "production"

export const ssr = fp(async (instance) => {
  instance.register(fastifyFavicon, { path: "./packages/env/img" })
  if (isProd) {
    const publicDir = resolve(fs.realpathSync(process.cwd()), "build/static")
    const nodeStats = resolve(publicDir, "node/loadable-stats.json")
    const webStats = resolve(publicDir, "web/loadable-stats.json")

    instance.register(fastifyCompress).after(() => {
      instance
        .register(fastifyStatic, {
          root: publicDir,
          prefix: "/static/",
        })
        .after(() => {
          instance.get("/*", async (req, reply) => {
            const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats })
            const { default: NodeApp } = nodeExtractor.requireEntrypoint()
            const webExtractor = new ChunkExtractor({ statsFile: webStats })
            const jsx = webExtractor.collectChunks(
              React.createElement(NodeApp as React.ComponentType<App>, {
                location: req.raw.url,
                context: {},
              })
            )
            const html = renderToString(jsx)
            reply.type("text/html")
            reply.send(`<!DOCTYPE html>
    <html>
    <head>
    <link rel='shortcut icon' href='/favicon.ico' />
    <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
    <meta content="utf-8" http-equiv="encoding">
    ${webExtractor.getLinkTags()}
    ${webExtractor.getStyleTags()}
    </head>
    <body>
    <div id="root">${html}</div>
    ${webExtractor.getScriptTags()}
    </body>
    </html>`)
          })
        })
    })
  } else {
    const api = async (req: Request, reply: Reply) => {
      reply.type("text/html")
      reply.send(`<!DOCTYPE html>
      <html>
      <body>
      <h1>FREE JS API Development Server</h1>
      <a href="/">Back to Home</a>
      </body>
      </html>
      `)
    }

    instance.get("/api", api)
    instance.get("/api/", api)
  }
})
