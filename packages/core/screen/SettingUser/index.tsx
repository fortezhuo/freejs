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
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col md={2}>
            <Text>Label 1</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
          <Form.Col md={2}>
            <Text>Label 2</Text>
          </Form.Col>
          <Form.Col md={4}>
            <Input.DateTime store={user} name="date" />
          </Form.Col>
        </Form.Row>
      </Form.Main>
    </Layout>
  )
})

export default SettingUser
