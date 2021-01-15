import React from "react"
import { Button, Section } from "../../../component"
import { useWatch } from "react-hook-form"
import { Content } from "./Content"

export const SectionWorkflow: React.FC<{
  document: any
  stateProps: JSONObject
}> = React.memo(({ document, stateProps }) => {
  const handleAdd = React.useCallback(() => {
    const maxApprover = document.getValues("maxApprover") || 0
    document.setValue("maxApprover", maxApprover + 1)
  }, [])

  const maxApprover: number = useWatch({
    control: document.control,
    name: "maxApprover",
    defaultValue: 0,
  })

  React.useEffect(() => {
    const { workflow = [] } = document.getValues()
    if (workflow.length < maxApprover) {
      document.setValue("workflow", workflow.concat({}))
    }
  }, [maxApprover])

  return (
    <Section
      label="List Workflow"
      right={
        <Button type="primary_1_bg" style={{ width: 80 }} onPress={handleAdd}>
          Add
        </Button>
      }
    >
      <Content {...{ document, stateProps }} />
    </Section>
  )
})
