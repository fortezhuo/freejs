import React from "react"
import {
  Layout,
  Section,
  Col,
  Row,
  Input,
  Label,
  ActionGroup,
  Button,
} from "../../component"
import { View, StyleSheet } from "react-native"
import { useHook } from "./hook"
import { tw } from "@free/tailwind"
import { SectionWorkflow } from "./SectionWorkflow"

const ProfileWorkflow: React.FC = (props) => {
  const { state, temp, actions, ...document } = useHook()

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
                control={document.control}
                name="parameter"
                placeholder="Parameter"
                isLoading={state.isLoading}
                rules={{ required: "Parameter is mandatory" }}
              />
            </Col>
          </Row>
          <Row dark>
            <Col md={2}>
              <Label>Status</Label>
            </Col>
            <Col light md={10}>
              <Input.Select
                control={document.control}
                name="status"
                placeholder="Status"
                isLoading={state.isLoading}
                rules={{ required: "Status is mandatory" }}
                options={temp.status}
              />
            </Col>
          </Row>
          <Row dark>
            <Col md={2}>
              <Label>Completed Status</Label>
            </Col>
            <Col light md={10}>
              <Input.Text
                control={document.control}
                name="completedStatus"
                placeholder="Completed Status"
                isLoading={state.isLoading}
                rules={{ required: "Completed Status is mandatory" }}
              />
            </Col>
          </Row>
          <Row dark>
            <Col md={2}>
              <Label>Reset Child while Revised</Label>
            </Col>
            <Col light md={10}>
              <Input.Select
                control={document.control}
                name="reviseResetChild"
                placeholder="Reset Child"
                isLoading={state.isLoading}
                rules={{ required: "Reset Child is mandatory" }}
                options={temp.reviseResetChild}
              />
            </Col>
          </Row>
          <Row dark>
            <Col md={2}>
              <Label>Submitter Field</Label>
            </Col>
            <Col light md={10}>
              <Input.Text
                control={document.control}
                name="submitterField"
                placeholder="Submitter Field"
                isLoading={state.isLoading}
                rules={{ required: "Submitter Field is mandatory" }}
              />
            </Col>
          </Row>
          <Row dark>
            <Col md={2}>
              <Label>Max Approver</Label>
            </Col>
            <Col light md={10}>
              <Input.Text
                control={document.control}
                name="maxApprover"
                placeholder="Max Approver"
                keyboardType="number-pad"
                isLoading={state.isLoading}
                editable={false}
              />
            </Col>
          </Row>
        </Section>
        <SectionWorkflow
          {...{
            document,
            isLoading: state.isLoading,
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
