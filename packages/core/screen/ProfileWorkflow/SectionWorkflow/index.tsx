import React from "react"
import { Button, Section } from "../../../component"

import { useWatch } from "react-hook-form"
import { Content } from "./Content"

export const SectionWorkflow: React.FC<{
  document: any
  stateProps: JSONObject
}> = React.memo(({ document, stateProps }) => {
  const maxApprover: number = useWatch({
    control: document.control,
    name: "maxApprover",
    defaultValue: 0,
  })

  const handleAdd = React.useCallback(() => {
    const { maxApprover = 0 } = document.getValues()
    document.setValue("maxApprover", maxApprover + 1)
  }, [])

  React.useEffect(() => {
    const { workflow = [], maxApprover = 0 } = document.getValues()
    if (workflow.length <= maxApprover) {
      document.setValue("workflow", workflow.concat({}))
    }
  }, [maxApprover])

  return (
    <Section
      label="List Workflow"
      right={
        <Button style={{ width: 80 }} type="primary_1_bg" onPress={handleAdd}>
          Add
        </Button>
      }
    >
      <Content {...{ document, stateProps }} />
    </Section>
  )
})
