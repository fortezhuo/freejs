import React from "react"
import loadable from "@loadable/component"

export const lazy = (fnImport: any) =>
  loadable(() => fnImport, {
    ssr: true,
    fallback: <span>Loading ...</span>,
  })
