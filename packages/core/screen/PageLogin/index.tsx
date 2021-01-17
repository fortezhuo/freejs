import React from "react"
import { Input, LayoutFull, Col, Gradient, Avatar } from "../../component"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { theme } from "../../config/theme"
import { tw } from "@free/tailwind"
import { useHook } from "./hook"
import logo from "../../img/logo.png"

interface LoginButton {
  isUpdating?: boolean
  onPress: VoidFunction
}

const LoginButton: React.FC<LoginButton> = ({ isUpdating, onPress }) => {
  const colors = isUpdating
    ? [theme.disabled_bg, theme.disabled_bg]
    : [theme.primary_1_bg, theme.primary_2_bg]
  return (
    <TouchableOpacity disabled={isUpdating} onPress={onPress}>
      <Gradient type="vertical" colors={colors} style={s.buttonLogin}>
        <Text style={isUpdating ? s.textLoginDisabled : s.textLogin}>
          LOGIN
        </Text>
      </Gradient>
    </TouchableOpacity>
  )
}

const PageLogin: React.FC = () => {
  const { stateProps, temp, onSubmit, error, ...document } = useHook()
  return (
    <LayoutFull transparent scroll>
      <View style={s.pageLogin} testID="PageLogin">
        <Col sm={11} md={9} lg={4} xl={4} style={s.boxLogin}>
          <Avatar source={logo} style={s.iconLogo} />
          <View style={s.boxInput}>
            <Input.Text
              document={document}
              placeholder="Username"
              autoCapitalize="none"
              name="username"
              rules={{
                required: "Please fill Username",
              }}
              {...stateProps}
            />
            <Input.Password
              document={document}
              name="password"
              placeholder="Password"
              rules={{
                required: "Please fill Password",
              }}
              {...stateProps}
            />
            <Input.Select
              clear={true}
              document={document}
              name="domain"
              placeholder="Domain"
              options={temp.domain}
              rules={{
                required: "Please fill Domain",
              }}
              {...stateProps}
            />
            <LoginButton {...stateProps} onPress={onSubmit} />
            <View style={tw("items-end mr-4")}>
              <Input.DisplayError error={error} />
            </View>
          </View>
        </Col>
      </View>
    </LayoutFull>
  )
}

const s = StyleSheet.create({
  layoutLogin: tw("justify-center flex-col"),
  pageLogin: tw("flex-1 flex-col items-center justify-center"),
  boxLogin: tw(`bg-white p-8 shadow-xl rounded-lg`, {
    height: 400,
  }),
  boxInput: tw("mt-4 justify-between flex-1"),
  iconLogo: tw("self-center w-20 h-20", { marginTop: -10 }),
  buttonLogin: tw(
    `${theme.input_border} w-full mt-3 h-10 items-center justify-center rounded-full`
  ),
  textLogin: tw("text-white"),
  textLoginDisabled: tw(theme.disabled_text),
  textError: tw("ml-1"),
})

export default PageLogin
