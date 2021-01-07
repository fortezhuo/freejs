import React from "react"
import loadable from "@loadable/component"
import Loader from "../component/Loader"

export const PageHome = loadable(() => import("@free/core/screen/PageHome"), {
  ssr: true,
  fallback: <Loader />,
})

export const Page500 = loadable(() => import("@free/core/screen/Page500"), {
  ssr: true,
  fallback: <Loader />,
})

export const Page404 = loadable(() => import("@free/core/screen/Page404"), {
  ssr: true,
  fallback: <Loader />,
})

export const PageLogin = loadable(() => import("@free/core/screen/PageLogin"), {
  ssr: true,
  fallback: <Loader />,
})

export const SettingUser = loadable(
  () => import("@free/core/screen/SettingUser"),
  {
    ssr: true,
    fallback: <Loader />,
  }
)

export const SettingACL = loadable(
  () => import("@free/core/screen/SettingACL"),
  {
    ssr: true,
    fallback: <Loader />,
  }
)

export const ProfileWorkflow = loadable(
  () => import("@free/core/screen/ProfileWorkflow"),
  {
    ssr: true,
    fallback: <Loader />,
  }
)

export const ViewGrid = loadable(() => import("@free/core/screen/ViewGrid"), {
  ssr: true,
  fallback: <Loader />,
})
