import React, { FC } from "react"
import {
  Input,
  LayoutFull,
  Col,
  Gradient,
  Avatar,
  Snackbar,
} from "../../component"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { theme } from "../../config/theme"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { useHook } from "./hook"
import logo from "../../img/logo.png"

const LoginButton: FC<any> = observer(({ store }) => {
  const colors = store.isUpdating
    ? [theme.disabled_bg, theme.disabled_bg]
    : [theme.primary_1_bg, theme.primary_2_bg]
  return (
    <TouchableOpacity disabled={store.isUpdating} onPress={store.login}>
      <Gradient type="vertical" colors={colors} style={styles.buttonLogin}>
        <Text
          style={store.isUpdating ? styles.textLoginDisabled : styles.textLogin}
        >
          LOGIN
        </Text>
      </Gradient>
    </TouchableOpacity>
  )
})

const PageLogin: FC = observer(() => {
  const store = useHook()
  return (
    <>
      <LayoutFull store={store}>
        <View style={styles.pageLogin}>
          <Col sm={11} md={10} lg={4} xl={4} style={styles.boxLogin}>
            <Avatar source={logo} style={styles.iconLogo} />
            <View style={styles.boxInput}>
              <Input.Text
                data-name="username"
                store={store}
                name="username"
                placeholder="Username"
                autoCapitalize="none"
              />
              <Input.Password
                store={store}
                data-name="password"
                name="password"
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
              <LoginButton store={store} />
            </View>
          </Col>
        </View>
      </LayoutFull>
      <Snackbar error />
    </>
  )
})

const styles = StyleSheet.create({
  pageLogin: tw("flex-1 flex-col items-center justify-center"),
  boxLogin: tw("bg-white p-8 shadow-xl rounded-lg", {
    height: 400,
  }),
  boxInput: tw("mt-4 justify-between flex-1"),
  iconLogo: tw("self-center w-20 h-20", { marginTop: -10 }),
  buttonLogin: tw(
    "w-full mt-3 h-10 items-center justify-center rounded-full shadow-md"
  ),
  textLogin: tw("text-white"),
  textLoginDisabled: tw(theme.disabled_text),
})

export default PageLogin
