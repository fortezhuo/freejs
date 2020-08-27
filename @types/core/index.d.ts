declare module "@free/core" {
  import { TextStyle, ViewStyle, TextInputProps } from "react-native"

  type ListStore = {
    [key: string]: any
  } | null

  type Config = {
    [key: string]: any
  }

  type SubMenu = {
    label: string
    icon: string
    path?: string
    visible: boolean
    onPress?: any
  }

  type Menu = {
    label: string
    icon: string
    visible: boolean
    children?: SubMenu[]
  }

  //Accordion
  interface AccordionProps {
    active?: boolean
    icon: string
    label: string
    children: ReactNode
  }

  interface AccordionItemProps {
    pathname?: string
    icon: string
    header?: boolean
    children: string
    onPress?: VoidFunction
    onClose?: VoidFunction
  }

  // AppLayout / MainLayout
  interface MainLayoutProps extends ViewProps {
    wallpaper?: boolean
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

  interface LayoutProps extends ViewProps {
    store?: any
  }

  // Menu
  interface MenuProps {
    onShow?: VoidFunction
    anchor: ReactNode
    style?: ViewStyle
    children: ReactNode
  }

  interface MenuItemProps extends IconButtonProps {
    active?: boolean
  }

  // Modal
  interface ModalProps {
    visible: boolean
    transparent?: boolean = false
    onShow?: VoidFunction
    onRequestClose?: VoidFunction
    onBackdropPress?: VoidFunction | undefined
    children: ReactNode
  }

  // Sidebar
  interface SidebarProps extends ViewProps {
    isOpen: boolean
  }

  // StateComponent
  interface StateComponent {
    state?: any
  }
}
