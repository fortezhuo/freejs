import React from "react"

import { Row, Col, Input, Label } from "../../component"

export const AdminPanel: React.FC<any> = ({ document }) => {
  return (
    <>
      <Row dark>
        <Col md={2}>
          <Label>Curr Author</Label>
        </Col>
        <Col light md={4}>
          <Input.Text name="currAuthor" multi document={document} />
        </Col>
        <Col md={2}>
          <Label>Add Author</Label>
        </Col>
        <Col light md={4}>
          <Input.Text name="addAuthor" multi document={document} />
        </Col>
      </Row>
      <Row dark>
        <Col md={2}>
          <Label>Doc Status</Label>
        </Col>
        <Col light md={4}>
          <Input.Text name="docStatus" document={document} />
        </Col>
        <Col md={2}>
          <Label>Status</Label>
        </Col>
        <Col light md={4}>
          <Input.Text name="status" document={document} />
        </Col>
      </Row>
      <Row dark>
        <Col md={2}>
          <Label>Curr Level</Label>
        </Col>
        <Col light md={4}>
          <Input.Text name="currLevel" document={document} />
        </Col>
        <Col md={2}>
          <Label>Back Level</Label>
        </Col>
        <Col light md={4}>
          <Input.Text name="backLevel" document={document} />
        </Col>
      </Row>
      <Row dark>
        <Col md={2}>
          <Label>Parameter</Label>
        </Col>
        <Col light md={4}>
          <Input.Text name="parameter" document={document} />
        </Col>
        <Col md={2}>
          <Label>Max Approver</Label>
        </Col>
        <Col light md={4}>
          <Input.Number name="maxApprover" document={document} />
        </Col>
      </Row>
    </>
  )
}
