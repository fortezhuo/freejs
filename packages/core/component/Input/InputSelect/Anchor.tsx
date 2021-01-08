import React from "react"
import { TouchableOpacity, Text } from "react-native"

export const Anchor: React.FC<any> = React.memo(({ onPress, displayValue }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>
        {displayValue} {Math.random()}
      </Text>
    </TouchableOpacity>
  )
})
