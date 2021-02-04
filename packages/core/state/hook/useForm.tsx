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
import { useApp } from "./useApp"
import { random, isDateString } from "../../util"
import dayjs from "dayjs"
import * as req from "../../request"

/*
 * State Props
 * isLoading : while onLoad triggered
 * isUpdating : while async triggered
 * isEditable
 */

const aFunction = [
  "onLoad",
  "onEdit",
  "onBeforeSave",
  "onAfterSave",
  "onBeforeCalculate",
  "onAfterCalculate",
  "onBeforeProcess",
  "onAfterProcess",
  "onDestroy",
]

export const useForm = (name: string) => {
  const app = useApp()
  const navigation = useNavigation()
  const form = useHookForm({ criteriaMode: "all" })
  const route = useRoute()
  const [temp, setTemp] = useState({})
  const [stateProps, setState] = useState({})
  const id = (route?.params as any).id
  const refMounted = React.useRef<boolean>(false)
  const refFunction = React.useRef<JSONObject>({})
  const isMobile = app.temp.isMobile

  const setData = React.useCallback(async (data: JSONObject) => {
    await asyncForEach(Object.keys(data), async (key: string) => {
      form.setValue(
        key,
        isDateString(data[key]) ? new Date(data[key]) : data[key],
        {
          shouldDirty: true,
        }
      )
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
    const isEditable = app.can("update", name)
    try {
      setState({ isLoading: true, isEditable })
      refFunction.current.onLoad && (await refFunction.current.onLoad())
      if (id.length === 24) {
        const {
          data: { result },
        } = await req.POST(`/api/find/${name}/${id}`, {})
        await setData(result)
      }
      refFunction.current.onEdit && (await refFunction.current.onEdit())
    } catch (err) {
      handleError(err)
    } finally {
      setState({ isLoading: false })
    }
  }, [id])

  const close = React.useCallback(() => {
    form.reset()
    refMounted.current = true
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
        refFunction.current.onBeforeSave &&
          (await refFunction.current.onBeforeSave(data))
        await req[method](`/api/${name}${isUpdate ? `/${id}` : ""}`, data)
        refFunction.current.onAfterSave &&
          (await refFunction.current.onAfterSave(data))
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
      refFunction.current.onDestroy && refFunction.current.onDestroy()
      aFunction.forEach((f: string) => {
        if (refFunction.current[f]) {
          refFunction.current[f] = async function () {}
        }
      })

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
    app,
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
    isMobile,
    random,
  }
}
