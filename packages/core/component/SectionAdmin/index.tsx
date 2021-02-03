import React from "react"
import { Col, Row, Label } from "../Grid"
import { Section } from "../Section"
import * as Input from "../Input"

export const SectionAdmin: React.FC<{
  children: any
  document: any
}> = React.memo(({ children, document }) => {
  return (
    <Section label="Admin Section">
      <Row dark>
        <Col md={2}>
          <Label>Created By</Label>
        </Col>
        <Col md={4} light>
          <Input.Text multi name="_createdBy" document={document} />
        </Col>
        <Col md={2}>
          <Label>Updated By</Label>
        </Col>
        <Col md={4} light>
          <Input.Text multi name="_updatedBy" document={document} />
        </Col>
      </Row>
      <Row dark>
        <Col md={2}>
          <Label>Doc Authors</Label>
        </Col>
        <Col md={4} light>
          <Input.Text
            multi
            name="_docAuthors"
            document={document}
            defaultValue={["*"]}
          />
        </Col>
        <Col md={2}>
          <Label>Doc Readers</Label>
        </Col>
        <Col md={4} light>
          <Input.Text
            multi
            name="_docReaders"
            document={document}
            defaultValue={["*"]}
          />
        </Col>
      </Row>

      {children}
    </Section>
  )
})
