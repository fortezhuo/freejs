declare module "@free/core" {
  import { TextStyle, ViewStyle, TextInputProps } from "react-native"

  type ListStore = {
    [key: string]: any
  } | null

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

  // AppLayout / Layout
  interface LayoutProps extends ViewProps {
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

  // Input
  interface InputTextProps extends TextInputProps {
    store: any
    model?: string
    name: string
    disabled?: boolean
    onChange?: VoidFunction
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
