import React from "react"
import UIStore from "./uiStore"

const StoreContext = React.createContext({
  ui: new UIStore(),
})

export const useStore = (name: string) => {
  const context: ListStore = React.useContext(StoreContext)
  return context[name]
}
