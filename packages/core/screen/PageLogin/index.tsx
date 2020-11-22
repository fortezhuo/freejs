import React from "react"
import { Input, LayoutFull, Col, Gradient, Avatar } from "../../component"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { theme } from "../../config/theme"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { useHook } from "./hook"
import logo from "../../img/logo.png"

const LoginButton: React.FC<any> = observer(({ store }) => {
  const colors = store.isUpdating
    ? [theme.disabled_bg, theme.disabled_bg]
    : [theme.primary_1_bg, theme.primary_2_bg]
  return (
    <TouchableOpacity disabled={store.isUpdating} onPress={store.login}>
      <Gradient type="vertical" colors={colors} style={s.buttonLogin}>
        <Text style={store.isUpdating ? s.textLoginDisabled : s.textLogin}>
          LOGIN
        </Text>
      </Gradient>
    </TouchableOpacity>
  )
})

const PageLogin: React.FC = observer(() => {
  const store = useHook()
  return (
    <LayoutFull
      animation="zoomInUp"
      store={store}
      style={{ justifyContent: "center", flexDirection: "column" }}
    >
      <View style={s.pageLogin} testID="PageLogin">
        <Col sm={11} md={9} lg={4} xl={4} style={s.boxLogin}>
          <Avatar source={logo} style={s.iconLogo} />
          <View style={s.boxInput}>
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
            <Input.DisplayError
              store={store}
              name="message"
              style={s.textError}
            />
            <LoginButton store={store} />
          </View>
        </Col>
      </View>
    </LayoutFull>
  )
})

const s = StyleSheet.create({
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
  textError: tw("ml-1"),
})

export default PageLogin
