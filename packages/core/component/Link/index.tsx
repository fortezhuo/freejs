import React from "react"
import { TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"

export const Link: React.FC<any> = observer(
  ({ target, name, params, disabled, navigation, children }) => {
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={() => {
          navigation.navigate(name, params)
        }}
      >
        {children}
      </TouchableOpacity>
    )
  }
)

export const LinkNav: React.FC<any> = observer(
  ({ target, name, params, disabled, children }) => {
    const navigation = useNavigation()
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={() => {
          navigation.navigate(name, params)
        }}
      >
        {children}
      </TouchableOpacity>
    )
  }
)
