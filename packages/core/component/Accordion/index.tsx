import React from "react"
import { TouchableOpacity } from "react-native"
import { Link } from "../Link"
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

interface AccordionItem {
  testID?: string
  active?: boolean
  icon: string
  children?: string
  navigation: any
  component: string
  params?: JSONObject
}

export const AccordionItem: React.FC<AccordionItem> = ({
  active,
  icon,
  children,
  navigation,
  component,
  params,
}) => {
  return (
    <Link navigation={navigation} name={component} params={params}>
      <SubTitle {...{ icon, active }}>{children}</SubTitle>
    </Link>
  )
}
