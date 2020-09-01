import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Layout } from "../../component/Layout"
import { useHook } from "./hook"
import * as Form from "../../component/Form"
import * as Input from "../../component/Input"
import { ActionBar } from "../../component/ActionBar"
import { Button } from "../../component/Button"
import { Text } from "react-native"

const SettingUser: FC = observer(() => {
  const user = useHook()

  return (
    <Layout form store={user}>
      <ActionBar>
        <Button store={user} type="primary">
          Save
        </Button>
        <Button store={user} type="primary">
          Close
        </Button>
      </ActionBar>
      <Form.Main>
        <Form.Row>
          <Form.Col sm={12} md={2} lg={2} xl={2}>
            <Text>Label</Text>
          </Form.Col>
          <Form.Col sm={12} md={10} lg={10} xl={10}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
      </Form.Main>
    </Layout>
  )
})

export default SettingUser
