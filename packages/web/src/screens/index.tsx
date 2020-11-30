import React from "react"
import loadable from "@loadable/component"
import Loader from "../component/Loader"

export const PageHome = loadable(() => import("@free/core/screen/PageHome"), {
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

export const SettingTrash = loadable(
  () => import("@free/core/screen/SettingTrash"),
  {
    ssr: true,
    fallback: <Loader />,
  }
)

export const ViewGrid = loadable(() => import("@free/core/screen/ViewGrid"), {
  ssr: true,
  fallback: <Loader />,
})

/*
export const PageNotFound = loadable(
  () => import("@free/core/screen/PageNotFound"),
  {
    ssr: true,
    fallback: <Loader />,
  }
)

export const PageError = loadable(() => import("@free/core/screen/PageError"), {
  ssr: true,
  fallback: <Loader />,
})





export const ViewGrid = loadable(() => import("@free/core/screen/ViewGrid"), {
  ssr: true,
  fallback: <Loader />,
})
*/
