import React from "react"

import { Row, Col, Input, Label } from "../../component"

export const AdminPanel: React.FC<any> = ({ document }) => {
  return (
    <>
      <Row dark>
        <Col md={2}>
          <Label>Parameter</Label>
        </Col>
        <Col light md={4}>
          <Input.Text name="parameter" document={document} />
        </Col>
      </Row>
    </>
  )
}
