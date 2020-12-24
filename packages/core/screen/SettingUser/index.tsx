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

const SettingUser: React.FC = (props) => {
  const { control, temp, actions } = useHook()
  return (
    <>
      <Layout
        stickyLeft={
          <View style={s.viewButton}>
            <ActionGroup.Large actions={actions} />
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
                control={control}
                name="username"
                placeholder="User Name"
                isLoading={temp.isLoading}
                rules={{ required: "User Name is mandatory" }}
              />
            </Col>
          </Row>
          <Row dark>
            <Col md={2}>
              <Label>Full Name</Label>
            </Col>
            <Col light md={10}>
              <Input.Text
                control={control}
                name="fullname"
                placeholder="Full Name"
                isLoading={temp.isLoading}
                rules={{ required: "Full Name is mandatory" }}
              />
            </Col>
          </Row>
          <Row dark>
            <Col md={2}>
              <Label>Email</Label>
            </Col>
            <Col light md={10}>
              <Input.Text
                isLoading={temp.isLoading}
                control={control}
                name="email"
                placeholder="Email"
                rules={{
                  required: "Email is mandatory",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid Email",
                  },
                }}
              />
            </Col>
          </Row>
          <Row dark>
            <Col md={2}>
              <Label>Roles</Label>
            </Col>
            <Col light md={10}>
              <Input.Select
                isLoading={temp.isLoading}
                control={control}
                name="roles"
                creatable
                multi
                placeholder="Roles"
                options={temp.roles}
                rules={{
                  validate: (value: any) =>
                    value.length == 0 ? "Roles is mandatory" : undefined,
                }}
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

export default SettingUser
