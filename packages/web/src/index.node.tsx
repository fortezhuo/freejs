import React, { FC } from "react"
import { StaticRouter } from "react-router"
import App from "./App"

const NodeApp: FC<App> = ({ location, context }) => (
  <StaticRouter location={location} context={context}>
    <App />
  </StaticRouter>
)

export default NodeApp
