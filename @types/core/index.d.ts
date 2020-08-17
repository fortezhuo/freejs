type ListStore =
  | {
      [key: string]: any
    }
  | undefined

type Config = {
  [key: string]: any
}

interface Icon {
  name: string
  size?: number
  color?: string
}

interface IconLabel extends Icon {
  name?: string | undefined
  style?: ViewStyle
  styleContainer?: ViewStyle
  styleText?: TextStyle
  children?: string
}

interface IconButton extends IconLabel {
  disabled?: boolean
  onPress?: VoidFunction
}

interface Accordion {
  icon: string
  label: string
  children: ReactNode
}

interface AccordionItem {
  icon: string
  header?: boolean
  children: string
  onPress?: VoidFunction
  onClose?: VoidFunction
}

interface Sidebar extends ViewProps {
  isOpen: boolean
}

type Footer = {
  info?: string
}

type Modal = {
  visible: boolean
  transparent?: boolean = false
  onRequestClose?: VoidFunction
  onBackdropPress?: VoidFunction | undefined
  children: ReactNode
}

type Menu = {
  anchor: ReactNode
  style?: ViewStyle
  children: ReactNode
}
interface MenuItem extends IconButton {}
