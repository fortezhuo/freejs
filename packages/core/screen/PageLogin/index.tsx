import React, { FC } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { tw } from "@free/tailwind"
import * as Input from "../../component/Input"
import { Button } from "../../component/Button"
import { IconLabel } from "../../component/Icon"
import { Layout } from "../../component/Layout"
import { observer } from "mobx-react-lite"
import { useHook } from "./hook"

const PageLogin: FC = observer(() => {
  const store = useHook()
  return (
    <Layout store={store}>
      <View style={styles.rootLogin}>
        <ScrollView>
          <View style={styles.boxLogin}>
            <IconLabel style={styles.iconLogo} name={"user"} size={60} />
            <Input.Text
              data-name="username"
              store={store}
              name="username"
              placeholder="Username"
              autoCapitalize="none"
            />
            <Input.Text
              store={store}
              data-name="password"
              name="password"
              secureTextEntry
              placeholder="Password"
              autoCapitalize="none"
            />
            <Input.Select
              store={store}
              data-name="domain"
              name="domain"
              placeholder="Domain"
              options={store.temp.get("domain") || []}
            />
            <Button type="primary" onPress={store.login}>
              Login
            </Button>
          </View>
        </ScrollView>
      </View>
    </Layout>
  )
})

const styles = StyleSheet.create({
  rootLogin: tw("flex-1 flex-col"),
  boxLogin: tw(
    "bg-white p-4 mt-16 self-center justify-between shadow-xl rounded",
    {
      width: 300,
      height: 300,
    }
  ),
  iconLogo: tw(
    "self-center rounded-full p-2 border-2 border-solid border-white bg-blue-500"
  ),
})

export default PageLogin
