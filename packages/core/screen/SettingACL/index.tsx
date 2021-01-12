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
import { SectionAccess } from "./SectionAccess"

const SettingACL: React.FC = () => {
  const { stateProps, actions, ...document } = useHook()

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
              <Label>Role</Label>
            </Col>
            <Col light md={10}>
              <Input.Text
                control={document.control}
                name="role"
                placeholder="Role"
                rules={{ required: "Role is mandatory" }}
                {...stateProps}
              />
            </Col>
          </Row>
          <Row dark>
            <Col md={2}>
              <Label>Inherit</Label>
            </Col>
            <Col light md={10}>
              <Input.Select
                multiple
                control={document.control}
                name="inherit"
                placeholder="Inherit"
                options={document.temp.inherit || []}
                {...stateProps}
              />
            </Col>
          </Row>
          <Row dark>
            <Col md={2}>
              <Label>Target</Label>
            </Col>
            <Col light md={10}>
              <Input.Select
                control={document.control}
                name="target"
                placeholder="Target"
                rules={{ required: "Target is mandatory" }}
                defaultValue={[]}
                options={document.temp.target || []}
                multiple
                {...stateProps}
              />
            </Col>
          </Row>
        </Section>
        <SectionAccess
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

export default SettingACL
