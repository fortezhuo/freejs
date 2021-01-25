import React from "react"
import { glyph } from "./glyph"
import { Text } from "react-native"

export const Icon: React.FC<any> = ({ style, name }) => {
  return (
    <Text style={[style, { fontFamily: "bootstrap-icons" }]}>
      {name ? glyph[name] : "?"}
    </Text>
  )
}
