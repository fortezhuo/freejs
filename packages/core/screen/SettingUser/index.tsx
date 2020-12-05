import React from "react"
import { observer } from "mobx-react-lite"
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

const SettingUser: React.FC = observer((props) => {
  const { user, actions } = useHook()
  return (
    <>
      <Layout
        store={user}
        stickyLeft={
          <View style={s.viewButton}>
            <ActionGroup.Large store={user} actions={actions} />
          </View>
        }
      >
        <Section label="User Information">
          <Row dark>
            <Col md={2}>
              <Label>User Name</Label>
            </Col>
            <Col light md={10}>
              <Input.Text
                store={user}
                name="username"
                placeholder="User Name"
              />
            </Col>
          </Row>
          <Row dark>
            <Col md={2}>
              <Label>Full Name</Label>
            </Col>
            <Col light md={10}>
              <Input.Text
                store={user}
                name="fullname"
                placeholder="Full Name"
              />
            </Col>
          </Row>
          <Row dark>
            <Col md={2}>
              <Label>Email</Label>
            </Col>
            <Col light md={10}>
              <Input.Text store={user} name="email" placeholder="Email" />
            </Col>
          </Row>
          <Row dark>
            <Col md={2}>
              <Label>Roles</Label>
            </Col>
            <Col light md={10}>
              <Input.Select
                store={user}
                name="roles"
                creatable
                multi
                placeholder="Roles"
                options={user.temp.get("roles") || []}
              />
            </Col>
          </Row>
        </Section>
      </Layout>
      <ActionGroup.Small store={user} actions={actions} />
    </>
  )
})

const s = StyleSheet.create({
  viewContent: tw("flex-col p-6 pt-0"),
  viewButton: tw("flex-row"),
  textStatus: tw("text-white"),
})

export default SettingUser
