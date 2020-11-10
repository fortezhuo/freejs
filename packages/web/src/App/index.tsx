import React from "react"
import loadable from "@loadable/component"
import BigLoader from "../component/BigLoader"
import Loader from "../component/Loader"
import * as screens from "../screens"

const AppLayout = loadable(() => import("../component/AppLayout"), {
  ssr: true,
  fallback: <BigLoader />,
})

const Routes = loadable(() => import("@free/core/component/Routes"), {
  ssr: true,
  fallback: <Loader />,
})

const App = () => {
  return (
    <AppLayout>
      <Routes screens={screens} />
    </AppLayout>
  )
}

export default App
