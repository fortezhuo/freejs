import React from "react"
import { Section } from "../../../component"
import { Content } from "./Content"

export const SectionAccess: React.FC<any> = React.memo(
  ({ document, ...props }) => {
    return (
      <Section label="List Access">
        <Content {...{ document, ...props }} />
      </Section>
    )
  }
)
