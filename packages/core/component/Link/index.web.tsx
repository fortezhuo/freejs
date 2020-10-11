import React, { FC, useCallback } from "react"
import { observer } from "mobx-react-lite"
import { useStore } from "../Store"
import { LinkProps } from "@free/core"

const noop = () => {}

export const Link: FC<LinkProps> = observer(
  ({
    href,
    target = "_self",
    disabled,
    children,
    beforeAction = noop,
    afterAction = noop,
  }) => {
    const { app } = useStore()
    const onPress = useCallback(() => {
      if (!disabled) {
        beforeAction()
        app.goto(href)
        afterAction()
      }
    }, [href])

    return (
      <a
        href={href}
        target={target}
        onClick={(e) => {
          e.preventDefault()
          onPress()
        }}
      >
        {children}
      </a>
    )
  }
)
