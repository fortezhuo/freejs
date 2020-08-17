import "mobx-react-lite/batchingForReactNative"
import React from "react"
import { NativeRouter } from "react-router-native"
import AppLayout from "@free/core/component/AppLayout"
import Home from "@free/core/screen/Home"

export default () => {
  return (
    <NativeRouter>
      <AppLayout>
        <Home />
      </AppLayout>
    </NativeRouter>
  )
}
