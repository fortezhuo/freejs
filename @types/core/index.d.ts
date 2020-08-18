declare module "@free/core" {
  import { TextStyle, ViewStyle } from "react-native"
  import { ViewStyle, TextStyle } from "react-native"

  type ListStore =
    | {
        [key: string]: any
      }
    | undefined

  type Config = {
    [key: string]: any
  }

  //Accordion

  interface AccordionProps {
    icon: string
    label: string
    children: ReactNode
  }

  interface AccordionItemProps {
    icon: string
    header?: boolean
    children: string
    onPress?: VoidFunction
    onClose?: VoidFunction
  }

  // AppLayout / Background

  interface BackgroundProps extends ViewProps {
    wallpaper: boolean
  }

  // Footer

  interface FooterProps {
    info?: string
  }

  // Icon

  interface IconProps {
    name?: string
    size?: number
    color?: string
  }

  interface IconLabelProps extends IconProps {
    name?: string | undefined
    style?: ViewStyle
    styleContainer?: ViewStyle
    styleText?: TextStyle
    children?: string
  }

  interface IconButtonProps extends IconLabelProps {
    disabled?: boolean
    onPress?: VoidFunction
  }

  // Menu

  interface MenuProps {
    anchor: ReactNode
    style?: ViewStyle
    children: ReactNode
  }

  interface MenuItemProps extends IconButtonProps {}

  // Modal

  interface ModalProps {
    visible: boolean
    transparent?: boolean = false
    onRequestClose?: VoidFunction
    onBackdropPress?: VoidFunction | undefined
    children: ReactNode
  }

  // Sidebar

  interface SidebarProps extends ViewProps {
    isOpen: boolean
  }
}
