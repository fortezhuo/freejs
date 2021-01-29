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
              rules={{ required: "Department is mandatory" }}
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
              name="email"
              placeholder="Email"
              rules={{
                required: "Email is mandatory",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid Email",
                },
              }}
              {...stateProps}
            />
          </Col>
          <Col md={2}>
            <Label>Amount</Label>
          </Col>
          <Col light md={4}>
            <Input.Select
              document={document}
              name="roles"
              multiple
              placeholder="Roles"
              options={document.temp.roles}
              rules={{
                validate: (value: any) =>
                  value.length == 0 ? "Roles is mandatory" : undefined,
              }}
              {...stateProps}
            />
          </Col>
        </Row>
      </Section>
    </Layout>
  )
}

export default FormRequest
