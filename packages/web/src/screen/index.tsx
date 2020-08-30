import React from "react"
import loadable from "@loadable/component"

export const PageHome = loadable(() => import("@free/core/screen/PageHome"), {
  ssr: true,
  fallback: <span>Loading ...</span>,
})

export const PageLogin = loadable(() => import("@free/core/screen/PageLogin"), {
  ssr: true,
  fallback: <span>Loading ...</span>,
})

export const SettingLog = loadable(
  () => import("@free/core/screen/SettingLog"),
  {
    ssr: true,
    fallback: <span>Loading ...</span>,
  }
)

export const AppLayout = loadable(
  () => import("@free/core/component/AppLayout"),
  {
    ssr: true,
    fallback: <span>Loading ...</span>,
  }
)

export const ViewGrid = loadable(() => import("@free/core/screen/ViewGrid"), {
  ssr: true,
  fallback: <span>Loading ...</span>,
})

export const PageNotFound = loadable(
  () => import("@free/core/screen/PageNotFound"),
  {
    ssr: true,
    fallback: <span>Loading ...</span>,
  }
)

export const SettingUser = loadable(
  () => import("@free/core/screen/SettingUser"),
  {
    ssr: true,
    fallback: <span>Loading ...</span>,
  }
)
