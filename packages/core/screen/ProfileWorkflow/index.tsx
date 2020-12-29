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
import { useHook } from "./hook"
import { tw } from "@free/tailwind"

const ProfileWorkflow: React.FC = (props) => {
  const { control, state, temp, actions } = useHook()

  return (
    <>
      <Layout
        stickyLeft={
          <View style={s.viewButton}>
            <ActionGroup.Large actions={actions} />
          </View>
        }
      >
        <Section label="Workflow">
          <Row dark>
            <Col md={2}>
              <Label>Parameter</Label>
            </Col>
            <Col light md={10}>
              <Input.Text
                control={control}
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
                control={control}
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
                control={control}
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
                control={control}
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
                control={control}
                name="submitterField"
                placeholder="Submitter Field"
                isLoading={state.isLoading}
                rules={{ required: "Submitter Field is mandatory" }}
              />
            </Col>
          </Row>
        </Section>
      </Layout>
      <ActionGroup.Small actions={actions} />
    </>
  )
}

const s = StyleSheet.create({
  viewContent: tw("flex-col p-6 pt-0"),
  viewButton: tw("flex-row"),
  textStatus: tw("text-white"),
})

export default ProfileWorkflow
