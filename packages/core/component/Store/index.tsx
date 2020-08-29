import React, { FC, memo } from "react"
import { devtools } from "../../util/devtools"
import * as store from "../../store"

devtools(store)
const StoreContext = React.createContext(store)

export const useStore = () => {
  const store = React.useContext(StoreContext)
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return store
}

export const StoreProvider: FC = memo(({ children }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
})
