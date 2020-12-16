import React from "react"
import { useApp } from "../../state/app"

const isHiddenByScreen = (screen?: string, props?: ObjectAny) => {
  switch (screen) {
    case "sm":
      return !!props?.smHidden
    case "md":
      return !!props?.mdHidden
    case "lg":
      return !!props?.lgHidden
    case "xl":
      return !!props?.xlHidden
  }
}

const getWidthByScreen = (screen?: string, props?: ObjectAny) => {
  let width = ``
  switch (screen) {
    case "sm":
      if (props?.sm) width = `w-${props.sm}/12`
      break
    case "md":
      if (props?.md) {
        width = `w-${props.md}/12`
      } else if (props?.sm) {
        width = `w-${props.sm}/12`
      }
      break
    case "lg":
      if (props?.lg) {
        width = `w-${props.lg}/12`
      } else if (props?.md) {
        width = `w-${props.md}/12`
      } else if (props?.sm) {
        width = `w-${props.sm}/12`
      }
      break
    case "xl":
      if (props?.xl) {
        width = `w-${props.xl}/12`
      } else if (props?.lg) {
        width = `w-${props.lg}/12`
      } else if (props?.md) {
        width = `w-${props.md}/12`
      } else if (props?.sm) {
        width = `w-${props.sm}/12`
      }
      break
  }
  return width === `w-12/12` ? `w-full` : width || ""
}

export const useHook = () => {
  const { temp } = useApp()
  const isHidden = React.useCallback(
    (props: ObjectAny) => isHiddenByScreen(temp.screen, props),
    [temp.screen]
  )
  const getWidth = React.useCallback(
    (props: ObjectAny) => getWidthByScreen(temp.screen, props),
    [temp.screen]
  )
  return { isHidden, getWidth }
}
