import React from "react"
import { Section } from "../../../component"
import { Content } from "./Content"
import { useWatch } from "react-hook-form"

export const SectionAccess: React.FC<{
  document: JSONObject
  stateProps: JSONObject
}> = React.memo(({ document, stateProps }) => {
  const target: string[] = useWatch({
    control: document.control,
    name: "target",
    defaultValue: [],
  })

  React.useEffect(() => {
    const { list = [] } = document.getValues()
    const newList = target.map((v: string) => {
      const stored = list.find((l: JSONObject) => l.on === v)
      return stored ? stored : { on: v }
    })
    document.setValue("list", newList)
  }, [target])

  return (
    <Section label="List Access">
      <Content {...{ document, stateProps }} />
    </Section>
  )
})
