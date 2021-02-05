import React from "react"
import { Section, Row, Input } from "../../component"
import { useWatch } from "react-hook-form"

export const SectionApproval: React.FC<{ document: any }> = React.memo(
  ({ document }) => {
    const maxApprover: number = useWatch({
      control: document.control,
      name: "maxApprover",
      defaultValue: 0,
    })

    return (
      <Section label={"Approval"}>
        <Row style={{ padding: 2 }}>
          {[...Array(maxApprover + 1)].map((_, i: number) => {
            return <Input.Approver key={"approval_" + i} {...{ i, document }} />
          })}
        </Row>
      </Section>
    )
  }
)
