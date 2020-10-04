import { useStore } from "../Store"
import { useEffect } from "react"
import { useParams } from "react-router"

export const useTitle = (store: any) => {
  const { app } = useStore()
  const params = useParams()
  useEffect(() => {
    app.set("subTitle", store.title || "")
    app.set("isForm", store.isForm)
    app.set("routerParams", params)
  }, [app.routerLocation])
}
