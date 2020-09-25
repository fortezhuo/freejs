import React, { FC } from "react"
import { Input, IconLabel, Layout, Col, Gradient } from "../../component"
import { View, StyleSheet, Text } from "react-native"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { useHook } from "./hook"
import { TouchableOpacity } from "react-native-gesture-handler"

const LoginButton: FC<any> = observer(({ store }) => {
  return (
    <TouchableOpacity disabled={store.is} onPress={store.login}>
      <Gradient
        type="vertical"
        colors={["primary_1", "primary_2"]}
        style={styles.buttonLogin}
      >
        <Text style={styles.captionLogin}>LOGIN</Text>
      </Gradient>
    </TouchableOpacity>
  )
})

const PageLogin: FC = observer(() => {
  const store = useHook()
  return (
    <Layout store={store}>
      <View style={styles.pageLogin}>
        <Col sm={11} md={10} lg={4} xl={4} style={styles.boxLogin}>
          <IconLabel style={styles.iconLogo} name={"user"} size={60} />
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
    </Layout>
  )
})

const styles = StyleSheet.create({
  pageLogin: tw("flex-1 flex-col items-center justify-center"),
  boxLogin: tw("bg-white p-8 shadow-xl rounded-lg", {
    height: 400,
  }),
  boxInput: tw("mt-6 justify-between flex-1"),
  iconLogo: tw(
    "self-center rounded-full p-2 border-2 border-solid border-white bg-blue-500"
  ),
  buttonLogin: tw(
    "w-full mt-4 p-3 items-center justify-center rounded-full shadow"
  ),
  captionLogin: tw("text-white"),
})

export default PageLogin
