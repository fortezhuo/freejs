import React from "react"
import { View } from "react-native"
export const Wrapper: React.FC<any> = ({ isMobile, children }) => (
  <View style={{ flex: 1 }}>{children}</View>
)
