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
        <Section label="Section 1">
          <Form.Row>
            <Form.Col md={2}>
              <Form.Label>Label 1</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.DateTime store={user} name="date" />
            </Form.Col>
            <Form.Col md={2}>
              <Form.Label>Label 2</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.Text store={user} name="date" />
            </Form.Col>
          </Form.Row>
          <Form.Row>
            <Form.Col md={2}>
              <Form.Label>Label 1</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.DateTime store={user} name="date" />
            </Form.Col>
            <Form.Col md={2}>
              <Form.Label>Label 2</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.Text store={user} name="date" />
            </Form.Col>
          </Form.Row>
          <Form.Row>
            <Form.Col md={2}>
              <Form.Label>Label 1</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.DateTime store={user} name="date" />
            </Form.Col>
            <Form.Col md={2}>
              <Form.Label>Label 2</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.Text store={user} name="date" />
            </Form.Col>
          </Form.Row>
          <Form.Row>
            <Form.Col md={2}>
              <Form.Label>Label 1</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.DateTime store={user} name="date" />
            </Form.Col>
            <Form.Col md={2}>
              <Form.Label>Label 2</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.Text store={user} name="date" />
            </Form.Col>
          </Form.Row>
          <Form.Row>
            <Form.Col md={2}>
              <Form.Label>Label 1</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.DateTime store={user} name="date" />
            </Form.Col>
            <Form.Col md={2}>
              <Form.Label>Label 2</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.Text store={user} name="date" />
            </Form.Col>
          </Form.Row>
          <Form.Row>
            <Form.Col md={2}>
              <Form.Label>Label 1</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.DateTime store={user} name="date" />
            </Form.Col>
            <Form.Col md={2}>
              <Form.Label>Label 2</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.Text store={user} name="date" />
            </Form.Col>
          </Form.Row>
          <Form.Row>
            <Form.Col md={2}>
              <Form.Label>Label 1</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.DateTime store={user} name="date" />
            </Form.Col>
            <Form.Col md={2}>
              <Form.Label>Label 2</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.Text store={user} name="date" />
            </Form.Col>
          </Form.Row>
        </Section>
        <Section label="Section 2">
          <Form.Row>
            <Form.Col md={2}>
              <Form.Label>Label 1</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.DateTime store={user} name="date" />
            </Form.Col>
            <Form.Col md={2}>
              <Form.Label>Label 2</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.Text store={user} name="date" />
            </Form.Col>
          </Form.Row>
          <Form.Row>
            <Form.Col md={2}>
              <Form.Label>Label 1</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.DateTime store={user} name="date" />
            </Form.Col>
            <Form.Col md={2}>
              <Form.Label>Label 2</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.Text store={user} name="date" />
            </Form.Col>
          </Form.Row>
          <Form.Row>
            <Form.Col md={2}>
              <Form.Label>Label 1</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.DateTime store={user} name="date" />
            </Form.Col>
            <Form.Col md={2}>
              <Form.Label>Label 2</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.Text store={user} name="date" />
            </Form.Col>
          </Form.Row>
          <Form.Row>
            <Form.Col md={2}>
              <Form.Label>Label 1</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.DateTime store={user} name="date" />
            </Form.Col>
            <Form.Col md={2}>
              <Form.Label>Label 2</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.Text store={user} name="date" />
            </Form.Col>
          </Form.Row>
          <Form.Row>
            <Form.Col md={2}>
              <Form.Label>Label 1</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.DateTime store={user} name="date" />
            </Form.Col>
            <Form.Col md={2}>
              <Form.Label>Label 2</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.Text store={user} name="date" />
            </Form.Col>
          </Form.Row>
          <Form.Row>
            <Form.Col md={2}>
              <Form.Label>Label 1</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.DateTime store={user} name="date" />
            </Form.Col>
            <Form.Col md={2}>
              <Form.Label>Label 2</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.Text store={user} name="date" />
            </Form.Col>
          </Form.Row>
          <Form.Row>
            <Form.Col md={2}>
              <Form.Label>Label 1</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.DateTime store={user} name="date" />
            </Form.Col>
            <Form.Col md={2}>
              <Form.Label>Label 2</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.Text store={user} name="date" />
            </Form.Col>
          </Form.Row>
          <Form.Row>
            <Form.Col md={2}>
              <Form.Label>Label 1</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.DateTime store={user} name="date" />
            </Form.Col>
            <Form.Col md={2}>
              <Form.Label>Label 2</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.Text store={user} name="date" />
            </Form.Col>
          </Form.Row>
          <Form.Row>
            <Form.Col md={2}>
              <Form.Label>Label 1</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.DateTime store={user} name="date" />
            </Form.Col>
            <Form.Col md={2}>
              <Form.Label>Label 2</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.Text store={user} name="date" />
            </Form.Col>
          </Form.Row>
          <Form.Row>
            <Form.Col md={2}>
              <Form.Label>Label 1</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.DateTime store={user} name="date" />
            </Form.Col>
            <Form.Col md={2}>
              <Form.Label>Label 2</Form.Label>
            </Form.Col>
            <Form.Col input md={4}>
              <Input.Text store={user} name="date" />
            </Form.Col>
          </Form.Row>
        </Section>
      </Form.Main>
    </Layout>
  )
})

export default SettingUser
