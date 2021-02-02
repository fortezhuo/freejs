import React from "react"
import { useDocument } from "./hook"
import {
  Section,
  Layout,
  ActionGroup,
  Row,
  Col,
  Input,
  Label,
} from "../../component"

const FormRequest: React.FC = () => {
  const { stateProps, actions, isMobile, ...document } = useDocument()

  return (
    <Layout
      workflow
      document={document}
      stickyLeft={
        !isMobile && <ActionGroup.Large actions={actions} {...stateProps} />
      }
    >
      <Section label="Request Information">
        <Row dark>
          <Col md={2}>
            <Label>Name</Label>
          </Col>
          <Col light md={4}>
            <Input.Text
              document={document}
              name="name"
              placeholder="Name"
              rules={{ required: "Name is mandatory" }}
              {...stateProps}
            />
          </Col>
          <Col md={2}>
            <Label>Department</Label>
          </Col>
          <Col light md={4}>
            <Input.Text
              document={document}
              name="department"
              placeholder="Department"
              {...stateProps}
            />
          </Col>
        </Row>
        <Row dark>
          <Col md={2}>
            <Label>Position</Label>
          </Col>
          <Col light md={4}>
            <Input.Text
              document={document}
              name="position"
              placeholder="Position"
              {...stateProps}
            />
          </Col>
          <Col md={2}>
            <Label>Amount</Label>
          </Col>
          <Col light md={4}>
            <Input.Number
              document={document}
              name="amount"
              placeholder="Amount"
              rules={{
                validate: (value: any) =>
                  value == 0 ? "Amount is mandatory" : undefined,
              }}
              {...stateProps}
            />
          </Col>
        </Row>
      </Section>
      <Section label={"Approval"}>
        <Row style={{ padding: 2 }}>
          <Input.Approver i={0} document={document} title="Submitter" />
          <Input.Approver i={1} document={document} title="Approver 1" />
          <Input.Approver i={2} document={document} title="Approver 2" />
          <Input.Approver i={3} document={document} title="Approver 3" />
        </Row>
      </Section>
    </Layout>
  )
}

export default FormRequest
