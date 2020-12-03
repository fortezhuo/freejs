import React from "react"
import { TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"

export const Link: React.FC<any> = observer(
  ({ target, store, name, params, disabled, navigation, children }) => {
    navigation = navigation ? navigation : useNavigation()

    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={() => {
          if (store) {
            store.set("isUpdating", true)
            navigation.navigate(name, params)
          } else {
            navigation.navigate(name, params)
          }
        }}
      >
        {children}
      </TouchableOpacity>
    )
  }
)
