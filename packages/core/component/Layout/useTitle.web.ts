import { useStore } from "../Store"
import { useEffect } from "react"
import { configApp } from "@free/env"

export const useTitle = (store: any) => {
  const { app } = useStore()
  useEffect(
    () => {
      app.set("subTitle", store.title)
      app.set("isForm", store.isForm)
      document.title = `${store.title ? store.title + " | " : ""}${
        configApp.displayName
      }`
    },
    [
      /*app.routerLocation*/
    ]
  )
}
