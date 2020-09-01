import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Layout } from "../../component/Layout"
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
        <Input.DateTime store={user} name="updated_at"></Input.DateTime>
      </Form.Main>
    </Layout>
  )
})

//
export default SettingUser
