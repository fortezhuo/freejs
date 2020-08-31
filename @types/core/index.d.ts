declare module "@free/core" {
  import { TextStyle, ViewStyle, TextInputProps, ViewProps } from "react-native"

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

  type Route = {
    path: string[]
    form: boolean | string
    view: boolean
    visible: boolean
  }

  //Accordion
  interface AccordionProps {
    testID?: string
    active?: boolean
    icon: string
    label: string
    children: ReactNode
  }

  interface AccordionItemProps {
    testID?: string
    pathname?: string
    icon: string
    header?: boolean
    children: string
    onPress?: VoidFunction
    onClose?: VoidFunction
  }

  interface DrawerProps {
    testID?: string
    children: ReactNode
  }

  interface HeaderProps {
    testID?: string
  }

  // AppLayout / MainLayout
  interface MainLayoutProps extends ViewProps {
    testID?: string
    wallpaper?: boolean
  }

  // Footer
  interface FooterProps {
    testID?: string
    info?: string
  }

  // Icon
  interface IconProps {
    testID?: string
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

  interface ButtonProps extends IconButtonProps {
    store: any
    type?: string
    outline?: boolean
    icon?: string
  }

  // Input
  interface InputTextProps extends TextInputProps {
    testID?: string
    store: any
    model?: string
    name: string
    disabled?: boolean
    onChange?: VoidFunction
  }

  interface InputCheckboxProps extends IconButtonProps {
    testID?: string
    multi?: boolean
    model?: string
    store?: any
    name: string
    value: string
    color?: string
    disabled?: boolean
    onChange?: VoidFunction
  }

  interface InputSelectProps {
    options?: []
    model?: string
    store: any
    name: string
    multi?: boolean
    onChange?: VoidFunction
    placeholder?: string
    disabled?: boolean
  }

  interface LayoutProps extends ViewProps {
    testID?: string
    store?: any
  }

  // Menu
  interface MenuProps {
    testID?: string
    onShow?: VoidFunction
    anchor: ReactNode
    style?: ViewStyle
    children: ReactNode
  }

  interface MenuItemProps extends IconButtonProps {
    testID?: string
    active?: boolean
  }

  // Modal
  interface ModalProps {
    testID?: string
    visible: boolean
    transparent?: boolean = false
    onShow?: VoidFunction
    onRequestClose?: VoidFunction
    onBackdropPress?: VoidFunction | undefined
    children: ReactNode
  }

  // Sidebar
  interface SidebarProps extends ViewProps {
    testID?: string
    isOpen: boolean
  }

  // StateComponent
  interface StateComponent {
    testID?: string
    state?: any
  }

  interface TableProps extends ViewProps {
    scroll?: boolean
  }

  type BodyProps = {
    [key: string]: any
  }

  type RowProps = {
    [key: string]: any
  }

  type CellProps = {
    [key: string]: any
  }

  interface TitleProps {
    testID?: string
    children: ReactNode
  }
}
