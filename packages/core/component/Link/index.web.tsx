import React from "react"
import { observer } from "mobx-react-lite"
import { buildLink } from "./helper"

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
