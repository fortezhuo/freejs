import React from "react"
import { useState } from "./common"
import { useForm as useHookForm } from "react-hook-form"
import {
  useRoute,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native"
import { Platform } from "react-native"
import { asyncForEach } from "../../util"
import { registerForteApp } from "../../util"
import { useApp } from "../../state"
import { random } from "../../util"
import * as req from "../../request"

/*
 * State Props
 * isLoading : while onLoad triggered
 * isUpdating : while async triggered
 * isEditable
 */

const initCallback = {
  onLoad: async function () {},
  onEdit: async function () {},
  onBeforeSave: async function (data: any) {},
  onAfterSave: async function (data: any) {},
  onBeforeCalculate: async function (data: any) {},
  onAfterCalculate: async function (data: any) {},
  onBeforeProcess: async function (data: any) {},
  onAfterProcess: async function (data: any) {},
  onDestroy: function () {},
}

export const useForm = (name: string) => {
  const app = useApp()
  const navigation = useNavigation()
  const form = useHookForm({ criteriaMode: "all" })
  const route = useRoute()
  const [temp, setTemp] = useState({})
  const [stateProps, setState] = useState({})
  const id = (route?.params as any).id
  const refMounted = React.useRef<boolean>(false)
  const refFunction = React.useRef<JSONObject>(initCallback)

  const setData = React.useCallback(async (data: JSONObject) => {
    await asyncForEach(Object.keys(data), async (key: string) => {
      form.setValue(key, data[key], { shouldDirty: true })
    })
  }, [])

  const handleError = React.useCallback((err: any) => {
    const { data, status } = err
    const { errors, message, stack } = data || {}

    // Validation
    if (message && message.indexOf("Validation Error") >= 0) {
      Object.keys(errors).forEach((key: string) => {
        form.setError(key, { type: "server", message: errors[key] })
      })
    }

    if (status === 403) {
      app.refAlert.current.error({
        title: "Attention",
        message,
        actions: [
          {
            label: "OK",
            type: "danger",
            onPress: () => app.refAlert.current.close(),
          },
        ],
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
      await refFunction.current.onLoad()
      if (id.length === 24) {
        const {
          data: { result },
        } = await req.POST(`/api/find/${name}/${id}`, {})
        await setData(result)
      }
    } catch (err) {
      handleError(err)
    } finally {
      setState({ isLoading: false, isEditable: app.can("update", name) })
    }
  }, [id])

  const close = React.useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    } else {
      navigation.navigate("Drawer", { screen: `View${route.name}` })
    }
  }, [route.name])

  const save = React.useCallback(
    async (data: any) => {
      const isUpdate = id.length === 24
      const method = isUpdate ? "PATCH" : "POST"
      try {
        setState({ isLoading: true })
        await refFunction.current.onBeforeSave(data)
        await req[method](`/api/${name}${isUpdate ? `/${id}` : ""}`, data)
        await refFunction.current.onAfterSave(data)
        return true
      } catch (err) {
        return handleError(err)
      } finally {
        setState({ isLoading: false })
      }
    },
    [id]
  )

  React.useEffect(() => {
    if (Platform.OS == "web") {
      registerForteApp({ [name]: form.getValues })
    }
    return () => {
      refFunction.current.onDestroy()
      refMounted.current = false
    }
  }, [route.name])

  useFocusEffect(
    React.useCallback(() => {
      if (refMounted.current) {
        ;(async () => {
          await handleLoad()
        })()
      } else {
        form.reset()
        refMounted.current = true
      }
    }, [refMounted.current, route.name])
  )

  React.useEffect(() => {
    if (!!app.error.message) {
      navigation.navigate("Error")
    }
  }, [app.error.message])

  return {
    ...form,
    req,
    refFunction,
    handleError,
    close,
    save,
    temp,
    setTemp,
    stateProps,
    setState,
    setData,
    id,
    random,
  }
}
