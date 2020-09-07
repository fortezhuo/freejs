import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Layout } from "../../component/Layout"
import { Section } from "../../component/Section"
import { useHook } from "./hook"
import * as Form from "../../component/Form"
import * as Input from "../../component/Input"
import { ActionBar } from "../../component/ActionBar"
import { Button } from "../../component/Button"

const SettingUser: FC = observer(() => {
  const user = useHook()

  return (
    <Layout store={user}>
      <ActionBar>
        <Button store={user} type="primary" style={{ marginRight: 4 }}>
          Save
        </Button>
        <Button store={user} type="danger" style={{ marginRight: 4 }}>
          Close
        </Button>
      </ActionBar>
      <Form.Main>
        <Section label="User Information">
          <Form.Row>
            <Form.Col md={2}>
              <Form.Label>User Name</Form.Label>
            </Form.Col>
            <Form.Col input md={10}>
              <Input.Text store={user} name="username" />
            </Form.Col>
          </Form.Row>
          <Form.Row>
            <Form.Col md={2}>
              <Form.Label>Full Name</Form.Label>
            </Form.Col>
            <Form.Col input md={10}>
              <Input.Text store={user} name="fullname" />
            </Form.Col>
          </Form.Row>
          <Form.Row>
            <Form.Col md={2}>
              <Form.Label>Email</Form.Label>
            </Form.Col>
            <Form.Col input md={10}>
              <Input.Text store={user} name="email" />
            </Form.Col>
          </Form.Row>
          <Form.Row>
            <Form.Col md={2}>
              <Form.Label>Role</Form.Label>
            </Form.Col>
            <Form.Col input md={10}>
              <Input.Select
                store={user}
                name="roles"
                options={user.temp.get("roles") || []}
              />
            </Form.Col>
          </Form.Row>
        </Section>
      </Form.Main>
    </Layout>
  )
})

export default SettingUser
