import React from "react"
import { TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { useLinkTo } from "@react-navigation/native"
import { useNavigationLinkTo } from "./helper"

export const Link: React.FC<any> = observer(
  ({ target, url, disabled, navigation, children }) => {
    const linkTo = navigation ? useNavigationLinkTo(navigation) : useLinkTo()
    return (
      <TouchableOpacity disabled={disabled} onPress={() => linkTo(url)}>
        {children}
      </TouchableOpacity>
    )
  }
)
