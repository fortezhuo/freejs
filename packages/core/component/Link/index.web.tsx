import React from "react"
import { observer } from "mobx-react-lite"
import { useLinkTo } from "@react-navigation/native"
import { useNavigationLinkTo } from "./helper"

export const Link: React.FC<any> = observer(
  ({ target = "_self", path, disabled, navigation, children }) => {
    const linkTo = navigation ? useNavigationLinkTo(navigation) : useLinkTo()
    return (
      <a
        href={path}
        target={target}
        onClick={(e) => {
          e.preventDefault()
          linkTo(path)
        }}
      >
        {children}
      </a>
    )
  }
)
