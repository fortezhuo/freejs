import React from "react"
import {
  Layout,
  Section,
  Col,
  Row,
  Input,
  Label,
  ActionGroup,
} from "../../component"
import { View, StyleSheet } from "react-native"
import { useDocument } from "./hook"
import { tw } from "@free/tailwind"
import { SectionWorkflow } from "./SectionWorkflow"

const ProfileWorkflow: React.FC = (props) => {
  const { stateProps, temp, actions, ...document } = useDocument()

  return (
    <>
      <Layout
        document={document}
        stickyLeft={
          <View style={s.viewButton}>
            <ActionGroup.Large actions={actions} />
          </View>
        }
      >
        <Section label="Information">
          <Row dark>
            <Col md={2}>
              <Label>Parameter</Label>
            </Col>
            <Col light md={10}>
              <Input.Text
                document={document}
                name="parameter"
                placeholder="Parameter"
                rules={{ required: "Parameter is mandatory" }}
                {...stateProps}
              />
            </Col>
          </Row>
          <Row dark>
            <Col md={2}>
              <Label>Status</Label>
            </Col>
            <Col light md={10}>
              <Input.Select
                document={document}
                name="status"
                placeholder="Status"
                rules={{ required: "Status is mandatory" }}
                options={temp.status}
                {...stateProps}
              />
            </Col>
          </Row>
          <Row dark>
            <Col md={2}>
              <Label>Completed Status</Label>
            </Col>
            <Col light md={10}>
              <Input.Text
                document={document}
                name="completedStatus"
                placeholder="Completed Status"
                rules={{ required: "Completed Status is mandatory" }}
                {...stateProps}
              />
            </Col>
          </Row>
          <Row dark>
            <Col md={2}>
              <Label>Reset Child while Revised</Label>
            </Col>
            <Col light md={10}>
              <Input.Select
                document={document}
                name="reviseResetChild"
                placeholder="Reset Child"
                rules={{ required: "Reset Child is mandatory" }}
                options={temp.reviseResetChild}
                {...stateProps}
              />
            </Col>
          </Row>
          <Row dark>
            <Col md={2}>
              <Label>Submitter Field</Label>
            </Col>
            <Col light md={10}>
              <Input.Text
                document={document}
                name="submitterField"
                placeholder="Submitter Field"
                rules={{ required: "Submitter Field is mandatory" }}
                {...stateProps}
              />
            </Col>
          </Row>
          <Row dark>
            <Col md={2}>
              <Label>Max Approver</Label>
            </Col>
            <Col light md={10}>
              <Input.Text
                document={document}
                name="maxApprover"
                placeholder="Max Approver"
                keyboardType="number-pad"
                editable={false}
                {...stateProps}
              />
            </Col>
          </Row>
        </Section>
        <SectionWorkflow
          {...{
            document,
            stateProps,
          }}
        />
      </Layout>
      <ActionGroup.Small actions={actions} />
    </>
  )
}

const s = StyleSheet.create({
  viewContent: tw("flex-col p-6 pt-0"),
  viewButton: tw("flex-row"),
  viewTitle: tw("px-3 py-1 flex-row items-center border-b border-gray-400"),
  textWorkflow: tw("font-bold flex-grow"),
  viewWorkflow: tw("m-2 border rounded-lg border-gray-400"),
  textStatus: tw("text-white"),
})

export default ProfileWorkflow
