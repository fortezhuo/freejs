import React from "react"
import {
  TouchableOpacity,
  View,
  Text,
  TouchableOpacityProps,
} from "react-native"

export const Button = (prop: TouchableOpacityProps) => {
  return (
    <TouchableOpacity {...prop}>
      <View>
        <Text>Button</Text>
      </View>
    </TouchableOpacity>
  )
}
