import React from "react"
import { useDocument } from "./useDocument"
import * as req from "../../request"

export const useWorkflow = (name: string) => {
  const { refFunction, setState, getId, ...document } = useDocument(name)

  const beforeProcess = React.useCallback(async (data: any) => {
    await refFunction.current.onBeforeProcess(data)
  }, [])

  const calculate = React.useCallback(async (data: any) => {
    await refFunction.current.onBeforeCalculate(data)
    //
    await refFunction.current.onAfterCalculate(data)
  }, [])

  const process = React.useCallback(async (data: any) => {
    const id = getId()
    const isUpdate = id === 24
    const method = isUpdate ? "PATCH" : "POST"
    await req[method](`/api/${name}${isUpdate ? `/${id}` : ""}`, data)
    return true
  }, [])

  const afterProcess = React.useCallback(async (data: any) => {
    await refFunction.current.onAfterProcess(data)
  }, [])

  const processDocument = React.useCallback(async (data: any) => {
    try {
      setState({ isLoading: true })
      await beforeProcess(data)
      if (await process(data)) {
        await afterProcess(data)
      }
    } catch (err) {
      return document.handleError(err)
    } finally {
      setState({ isLoading: false })
    }
  }, [])
}
