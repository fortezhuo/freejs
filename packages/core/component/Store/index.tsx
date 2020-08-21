import React, { FC } from "react"
import { store } from "../../store"
import { devtools } from "../../util/devtools"
import { ListStore } from "@free/core"

const StoreContext = React.createContext<ListStore>(null)

export const useStore = () => {
  const store = React.useContext(StoreContext)
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return store
}

export const StoreProvider: FC = ({ children }) => {
  devtools(store)
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
