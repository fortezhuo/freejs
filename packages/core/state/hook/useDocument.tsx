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

const initCallback = {
  onLoad: async function () {},
  onBeforeSave: async function (data: any) {},
}

export const useDocument = (name: string) => {
  const app = useApp()
  const navigation = useNavigation()
  const form = useForm({ criteriaMode: "all" })
  const route = useRoute()
  const [temp, setTemp] = useState({})
  const [state, setState] = useState({})
  const id = (route?.params as any).id
  const refMounted = React.useRef<boolean>(false)
  const refFunction = React.useRef<JSONObject>(initCallback)

  React.useEffect(() => {
    if (Platform.OS == "web") {
      registerForteApp({ [name]: form.getValues })
    }
    form.reset()
    return () => {
      form.reset()
      refMounted.current = false
    }
  }, [])

  React.useEffect(() => {
    if (!!app.error.message) {
      navigation.navigate("Error")
    }
  }, [app.error.message])

  useFocusEffect(
    React.useCallback(() => {
      if (refMounted.current) {
        handleLoad()
      } else {
        refMounted.current = true
      }
    }, [refMounted.current])
  )

  const setData = React.useCallback(async (data: JSONObject) => {
    await asyncForEach(Object.keys(data), async (key: string) => {
      form.setValue(key, data[key])
    })
  }, [])

  const handleError = React.useCallback((err: any) => {
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
  }, [])

  const handleLoad = React.useCallback(async () => {
    try {
      setState({ isLoading: true })
      if (id.length === 24) {
        const {
          data: { result },
        } = await req.POST(`/api/find/${name}/${id}`, {})
        await setData(result)
      }
      await refFunction.current.onLoad()
    } catch (err) {
      handleError(err)
    } finally {
      setState({ isLoading: false })
    }
  }, [])

  const close = React.useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    } else {
      navigation.navigate("Drawer", { screen: `View${route.name}` })
    }
  }, [])

  const save = React.useCallback(async (data: any) => {
    const isUpdate = id.length === 24
    const method = isUpdate ? "PATCH" : "POST"
    try {
      setState({ isLoading: true })
      await refFunction.current.onBeforeSave(data)
      await req[method](`/api/${name}${isUpdate ? `/${id}` : ""}`, data)
      return true
    } catch (err) {
      return handleError(err)
    } finally {
      setState({ isLoading: false })
    }
  }, [])

  return {
    ...form,
    refFunction,
    close,
    save,
    temp,
    setTemp,
    state,
    setState,
    setData,
  }
}
