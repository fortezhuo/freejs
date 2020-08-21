import React, { FC } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { tw } from "@free/tailwind"
import * as Input from "../../component/Input"
import { Button } from "../../component/Button"
import { IconLabel } from "../../component/Icon"
import { useLogin } from "./hook"

const Login: FC = () => {
  const { login } = useLogin()

  return (
    <View style={styles.rootLogin}>
      <ScrollView>
        <View style={styles.boxLogin}>
          <IconLabel style={styles.iconLogo} name={"user"} size={60} />
          <Input.Text
            data-name="username"
            store={login}
            name="username"
            placeholder="Username"
            autoCapitalize="none"
          />
          <Input.Text
            store={login}
            data-name="password"
            name="password"
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
          />
          <Button type="primary">Login</Button>
        </View>
      </ScrollView>
    </View>
  )
}

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

export default Login
