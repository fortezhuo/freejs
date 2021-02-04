import React from "react"

export const useWorkflow = ({ req, refFunction, document }: JSONObject) => {
  const { id } = document

  const reqProcess = React.useCallback(async () => {
    const data = document.getValues()

    const isUpdate = id === 24
    const method = isUpdate ? "PATCH" : "POST"
    await req[method](`/api/${name}${isUpdate ? `/${id}` : ""}`, data)
    return true
  }, [id])

  const reqCalculate = React.useCallback(async () => {
    const data = document.getValues()
    if (data.parameter || "" !== "") {
      const res = await req.POST(`/api/find/workflow/`, {
        _params: {
          query: {
            parameter: data.parameter,
            field: {
              _createdAt: -1,
              _createdBy: -1,
              _updatedBy: -1,
              _updatedAt: -1,
              _docAuthors: -1,
              _docReaders: -1,
            },
          },
        },
      })
    } else {
    }
  }, [])

  const beforeProcess = React.useCallback(async () => {
    const data = document.getValues()
    await refFunction.current.onBeforeProcess(data)
  }, [])

  const calculate = React.useCallback(async () => {
    try {
      document.setState({ isUpdating: true })
      refFunction.current.onBeforeCalculate &&
        (await refFunction.current.onBeforeCalculate())
      await reqCalculate()
      refFunction.current.onAfterCalculate &&
        (await refFunction.current.onAfterCalculate())
    } catch (err) {
      document.handleError(err)
    } finally {
      document.setState({ isUpdating: false })
    }
  }, [])

  const afterProcess = React.useCallback(async () => {
    const data = document.getValues()
    await refFunction.current.onAfterProcess(data)
  }, [])

  const process = React.useCallback(async (data: any) => {
    try {
      document.setState({ isLoading: true })
      await beforeProcess()
      if (await reqProcess()) {
        await afterProcess()
      }
    } catch (err) {
      return document.handleError(err)
    } finally {
      document.setState({ isLoading: false })
    }
  }, [])

  return { calculate, process, afterProcess }
}
