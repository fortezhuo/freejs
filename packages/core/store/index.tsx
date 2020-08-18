import React from "react"
import UIStore from "./uiStore"
import { ListStore } from "@free/core"

const StoreContext = React.createContext({
  ui: new UIStore(),
})

export const useStore = (name?: string) => {
  const context: ListStore = React.useContext(StoreContext)
  return name ? context[name] : context
}
