import React from "react"
import AppLayout from "@free/core/component/AppLayout"
import Routes from "@free/core/component/Routes"
import * as screens from "./screens"

export default () => {
  return (
    <AppLayout>
      <Routes screens={screens} />
    </AppLayout>
  )
}
