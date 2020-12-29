import React from "react"
import { useState } from "./common"
import { useForm } from "react-hook-form"
import {
  useRoute,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native"
import { Platform } from "react-native"
import { asyncForEach } from "../../util"
import { registerForteApp } from "../../util"
import { useApp } from "../../state"
import * as req from "../../request"

const defaultCallback = {
  onLoad: async function () {},
  onBeforeSave: async function (data: any) {},
}

export const useDocument = (name: string, initCallback?: JSONObject) => {
  const app = useApp()
  const navigation = useNavigation()
  const form = useForm({ criteriaMode: "all" })
  const route = useRoute()
  const [isFirst, setFirst] = React.useState(false)
  const [temp, setTemp] = useState({})
  const [state, setState] = useState({})
  const id = (route?.params as any).id

  const f = React.useMemo(() => {
    const cb: JSONObject = { ...defaultCallback, ...initCallback }
    let bindCB: JSONObject = {}
    Object.keys(cb).forEach((key) => {
      bindCB[key] = cb[key].bind({ app, navigation, form, route })
    })

    return bindCB
  }, [])

  const handleError = (err: any) => {
    const {
      data: { errors, message, stack },
      status,
    } = err
    // Validation
    if (message.indexOf("Validation Error") >= 0) {
      Object.keys(errors).forEach((key: string) => {
        form.setError(key, { type: "server", message: errors[key] })
      })
    }
    // Error 500
    if (status === 500) {
      app.setError({ message, stack })
    }
  }

  const close = React.useCallback(() => {
    navigation.goBack()
  }, [])

  const save = React.useCallback(async (data: any) => {
    const isUpdate = id.length === 24
    const method = isUpdate ? "PATCH" : "POST"
    try {
      setState({ isLoading: true })
      await f.onBeforeSave(data)
      await req[method](`/api/${name}${isUpdate ? `/${id}` : ""}`, data)
      return true
    } catch (err) {
      return handleError(err)
    } finally {
      setState({ isLoading: false })
    }
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      const onLoad = async function () {
        try {
          if (isFirst) {
            form.reset()
          } else {
            setState({ isLoading: true })
            if (id.length === 24) {
              const {
                data: { result },
              } = await req.POST(`/api/find/${name}/${id}`, {})
              await asyncForEach(Object.keys(result), async (key: string) => {
                form.setValue(key, result[key])
              })
            }
            await f.onLoad()
          }
        } catch (err) {
          handleError(err)
        } finally {
          setState({ isLoading: false })
        }
      }
      onLoad()

      return () => {
        setFirst(false)
      }
    }, [isFirst])
  )

  React.useEffect(() => {
    if (Platform.OS == "web") {
      registerForteApp({ [name]: form.getValues })
    }
  }, [])

  React.useEffect(() => {
    if (!!app.error.message) {
      navigation.navigate("Error")
    }
  }, [app.error.message])

  return { ...form, close, save, temp, setTemp, state, setState }
}
