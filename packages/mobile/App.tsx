import React from "react"
import { NativeRouter } from "react-router-native"
import AppLayout from "@free/core/component/AppLayout"
import Routes from "@free/core/component/Routes"
import * as screen from "./screen"

export default () => {
  return (
    <NativeRouter>
      <AppLayout>
        <Routes screen={screen} />
      </AppLayout>
    </NativeRouter>
  )
}
