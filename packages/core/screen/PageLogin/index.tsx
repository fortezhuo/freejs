import React from "react"
import { Input, LayoutFull, Col, Gradient, Avatar } from "../../component"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { theme } from "../../config/theme"
import { tw } from "@free/tailwind"
import { useApp } from "../../state/app"
import logo from "../../img/logo.png"
import { POST } from "../../request"

const LoginButton: React.FC<any> = ({ isUpdating, onPress }) => {
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
  const { control, handleSubmit, errors } = useForm()
  const app = useApp()

  const onSubmit = React.useCallback(async (data: any) => {
    try {
      const { username, password, domain } = data
      app.setTemp({ isUpdating: true })
      const res = await POST("/api/auth", { username, password, domain })
      app.setData({ auth: res.data.result })
    } catch (err) {
      app.setError(err)
    } finally {
      app.setTemp({ isUpdating: false })
    }
  }, [])

  return (
    <LayoutFull transparent>
      <View style={s.pageLogin} testID="PageLogin">
        <Col sm={11} md={9} lg={4} xl={4} style={s.boxLogin}>
          <Avatar source={logo} style={s.iconLogo} />
          <View style={s.boxInput}>
            <Controller
              control={control}
              render={({ onChange, value }) => (
                <Input.Text
                  placeholder="Username"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="username"
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ onChange, value }) => (
                <Input.Text
                  placeholder="Password"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="password"
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ onChange, value }) => (
                <Input.Text
                  placeholder="Domain"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="domain"
              defaultValue=""
            />
          </View>
          <LoginButton onPress={handleSubmit(onSubmit)} />
        </Col>
      </View>
    </LayoutFull>
  )
}

const s = StyleSheet.create({
  layoutLogin: tw("justify-center flex-col"),
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
