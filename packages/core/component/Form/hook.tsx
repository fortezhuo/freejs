import { useStore } from "../Store"

const getScreenSize = (width: number) => {
  if (width >= 1200) return "xl"
  if (width >= 992 && width < 1200) return "lg"
  if (width >= 768 && width < 992) return "md"
  if (width < 768) return "sm"
}

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
  const { app } = useStore()
  const screen = getScreenSize(app?.dimension?.width)
  const isHidden = (props: ObjectAny) => isHiddenByScreen(screen, props)
  const getWidth = (props: ObjectAny) => getWidthByScreen(screen, props)
  return { screen, isHidden, getWidth }
}
