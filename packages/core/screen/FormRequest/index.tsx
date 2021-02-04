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
import { AdminPanel } from "./AdminPanel"
import { Effect } from "./Effect"

const FormRequest: React.FC = () => {
  const { stateProps, actions, isMobile, ...document } = useDocument()

  return (
    <Layout
      document={document}
      adminPanel={<AdminPanel document={document} />}
      stickyLeft={
        !isMobile && <ActionGroup.Large actions={actions} {...stateProps} />
      }
    >
      <Effect document={document} />
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
              disabled
              {...stateProps}
            />
          </Col>
          <Col md={2}>
            <Label>Division</Label>
          </Col>
          <Col light md={4}>
            <Input.Text
              document={document}
              name="company"
              placeholder="Company"
              disabled
              {...stateProps}
            />
          </Col>
        </Row>
        <Row dark>
          <Col md={2}>
            <Label>Division</Label>
          </Col>
          <Col light md={4}>
            <Input.Text
              document={document}
              name="division"
              placeholder="Division"
              disabled
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
              disabled
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
              disabled
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
      <Section label="List Superior">
        <Row dark>
          <Col md={2}>
            <Label>Name</Label>
          </Col>
          <Col light md={4}>
            <Input.Text
              document={document}
              name="superior_1"
              placeholder="Superior 1"
              disabled
              {...stateProps}
            />
          </Col>
          <Col md={2}>
            <Label>Superior 2</Label>
          </Col>
          <Col light md={4}>
            <Input.Text
              document={document}
              name="superior_2"
              placeholder="Superior 2"
              disabled
              {...stateProps}
            />
          </Col>
        </Row>
      </Section>
      <Section label={"Approval"}>
        <Row style={{ padding: 2 }}>
          <Input.Approver i={0} document={document} />
          <Input.Approver i={1} document={document} />
          <Input.Approver i={2} document={document} />
          <Input.Approver i={3} document={document} />
        </Row>
      </Section>
    </Layout>
  )
}

export default FormRequest
