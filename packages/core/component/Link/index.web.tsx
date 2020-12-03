import React from "react"
import { observer } from "mobx-react-lite"
import { buildLink } from "./helper"
import { useNavigation } from "@react-navigation/native"

export const Link: React.FC<any> = observer(
  ({
    target = "_self",
    name,
    params,
    store,
    disabled,
    navigation,
    children,
  }) => {
    navigation = navigation ? navigation : useNavigation()
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
          if (store) {
            store.set("isUpdating", true)
            navigation.navigate(name, params)
          } else {
            navigation.navigate(name, params)
          }
        }}
      >
        {children}
      </a>
    )
  }
)
