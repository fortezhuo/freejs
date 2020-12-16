import React from "react"
import { TouchableOpacity } from "react-native"
import { Link } from ".."
import { AccordionItemProps } from "@free/core"
import { Wrapper } from "./Wrapper"
import { SubTitle, Title } from "./Title"

interface Accordion {
  icon: string
  label: string
  active?: boolean
  children: React.ReactNode
}

export const Accordion: React.FC<Accordion> = ({
  icon,
  label,
  active = false,
  children,
}) => {
  const [isExpand, set] = React.useState<boolean>(false)
  const toggle = React.useCallback(() => set((isExpand) => !isExpand), [])

  return (
    <>
      <TouchableOpacity onPress={toggle}>
        <Title {...{ icon, isExpand, label }} />
      </TouchableOpacity>
      <Wrapper {...{ isExpand }} initOpen={active}>
        {children}
      </Wrapper>
    </>
  )
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  testID = "AccordionItem",
  active,
  icon,
  children,
  navigation,
  component,
}) => {
  return (
    <Link navigation={navigation} testID={testID} name={component}>
      <SubTitle {...{ icon, active }}>{children}</SubTitle>
    </Link>
  )
}
