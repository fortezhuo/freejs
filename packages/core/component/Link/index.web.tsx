import React from "react"
import { observer } from "mobx-react-lite"
import { buildLink } from "./helper"
import { useNavigation } from "@react-navigation/native"

export const Link: React.FC<any> = observer(
  ({ target = "_self", name, params, disabled, navigation, children }) => {
    const path = buildLink(name, params)

    return (
      <a
        style={
          disabled
            ? {
                pointerEvents: "none",
                cursor: "default",
              }
            : {}
        }
        href={path}
        target={target}
        onClick={(e) => {
          e.preventDefault()
          navigation.navigate(name, params)
        }}
      >
        {children}
      </a>
    )
  }
)

export const LinkNav: React.FC<any> = observer(
  ({ target, name, params, disabled, children }) => {
    const navigation = useNavigation()
    const path = buildLink(name, params)

    return (
      <a
        style={
          disabled
            ? {
                pointerEvents: "none",
                cursor: "default",
              }
            : {}
        }
        href={path}
        target={target}
        onClick={(e) => {
          e.preventDefault()
          navigation.navigate(name, params)
        }}
      >
        {children}
      </a>
    )
  }
)
