import React from "react"
import { observer } from "mobx-react-lite"
import { buildLink, useLink } from "./helper"

export const Link: React.FC<any> = observer(
  ({ target = "_self", name, params, disabled, navigation, children }) => {
    const path = buildLink(name, params)
    const onClick = useLink(name, params, navigation)

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
          onClick()
        }}
      >
        {children}
      </a>
    )
  }
)
