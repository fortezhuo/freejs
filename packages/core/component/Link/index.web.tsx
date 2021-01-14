import React from "react"
import { buildLink, useLink } from "./helper"

interface Link {
  target?: string
  name: string
  params?: JSONObject
  disabled?: boolean
  navigation: any
  children: React.ReactNode
}

export const Link: React.FC<Link> = ({
  target = "_self",
  name,
  params,
  disabled,
  navigation,
  children,
}) => {
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
