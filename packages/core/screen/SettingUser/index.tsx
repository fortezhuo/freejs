import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Text } from "react-native"
import { Layout } from "../../component/Layout"
import { useHook } from "./hook"
const SettingUser: FC = observer(() => {
  const user = useHook()
  return (
    <Layout store={user}>
      <Text>Setting User</Text>
    </Layout>
  )
})

export default SettingUser
