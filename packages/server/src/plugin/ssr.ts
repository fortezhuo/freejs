import fs from "fs"
import fp from "fastify-plugin"
import React from "react"
import fastifyStatic from "fastify-static"
import fastifyCompress from "fastify-compress"
import { resolve } from "path"
import { renderToString } from "react-dom/server"
import { ChunkExtractor } from "@loadable/server"

const publicDir = resolve(fs.realpathSync(process.cwd()), "build/static")
const nodeStats = resolve(publicDir, "node/loadable-stats.json")
const webStats = resolve(publicDir, "web/loadable-stats.json")

export const ssr = fp(async (instance) => {
  instance.register(fastifyCompress)
  instance.register(fastifyStatic, {
    root: publicDir,
    prefix: "/static/",
  })
  instance.get("/*", async (req, reply) => {
    const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats })
    const { default: App } = nodeExtractor.requireEntrypoint()
    const webExtractor = new ChunkExtractor({ statsFile: webStats })
    const jsx = webExtractor.collectChunks(React.createElement(App, null))
    const html = renderToString(jsx)
    reply.type("text/html")
    reply.send(`<!DOCTYPE html>
<html>
  <head>
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
