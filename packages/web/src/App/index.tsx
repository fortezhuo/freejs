import React from "react"
import loadable from "@loadable/component"
import BigLoader from "../component/BigLoader"
import { useRoutes } from "@free/core/component/Routes"
import * as screen from "../screen"

const AppLayout = loadable(() => import("@free/core/component/AppLayout"), {
  ssr: true,
  fallback: <BigLoader />,
})

const App = () => {
  const Routes = useRoutes(screen)

  return (
    <AppLayout>
      <Routes />
    </AppLayout>
  )
}

export default App
