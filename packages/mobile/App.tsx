import React from "react"
import AppLayout from "@free/core/component/AppLayout"
import Routes from "@free/core/component/Routes"
import * as screen from "./screen"

export default () => {
  return (
    <AppLayout>
      <Routes screen={screen} />
    </AppLayout>
  )
}
