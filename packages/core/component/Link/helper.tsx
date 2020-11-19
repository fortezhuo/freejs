import React from "react"
import { getStateFromPath, getActionFromState } from "@react-navigation/core"
import { useNavigation } from "@react-navigation/native"
import LinkingContext from "@react-navigation/native/lib/module/LinkingContext"

export const useNavigationLinkTo = function (navigation: any) {
  const linking = React.useContext(LinkingContext)

  if (!navigation) {
    navigation = useNavigation()
  }

  const linkTo = React.useCallback(
    (path: string) => {
      if (!path.startsWith("/")) {
        throw new Error(`The path must start with '/' (${path}).`)
      }

      if (navigation === undefined) {
        throw new Error(
          "Couldn't find a navigation object. Is your component inside a screen in a navigator?"
        )
      }

      const { options }: any = linking

      const state = options?.getStateFromPath
        ? options.getStateFromPath(path, options.config)
        : getStateFromPath(path, options?.config)

      if (state) {
        let root = navigation
        let current

        // Traverse up to get the root navigation
        while ((current = root.dangerouslyGetParent())) {
          root = current
        }

        const action = getActionFromState(state, options?.config)

        if (action !== undefined) {
          root.dispatch(action)
        } else {
          root.reset(state)
        }
      } else {
        throw new Error("Failed to parse the path to a navigation state.")
      }
    },
    [linking, navigation]
  )

  return linkTo
}
