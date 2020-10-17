import React, { FC, useCallback } from "react"
import { TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { useStore } from "../Store"
import { LinkProps } from "@free/core"

const noop = () => {}

export const Link: FC<LinkProps> = observer(
  ({
    href,
    target,
    disabled,
    children,
    beforeAction = noop,
    afterAction = noop,
  }) => {
    const { app } = useStore()
    const onPress = useCallback(() => {
      beforeAction()
      app.goto(href)
      afterAction()
    }, [href])

    return (
      <TouchableOpacity disabled={disabled} onPress={onPress}>
        {children}
      </TouchableOpacity>
    )
  }
)