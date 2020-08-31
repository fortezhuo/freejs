import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Layout } from "../../component/Layout"
import { Accordion } from "../../component/Accordion"
import { useHook } from "./hook"
import * as Form from "../../component/Form"
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
        <Accordion label="User Information"></Accordion>
      </Form.Main>
    </Layout>
  )
})

export default SettingUser
