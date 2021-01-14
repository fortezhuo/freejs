import React from "react"
import { useForm } from "../../state/hook"

export const useDocument = () => {
  const { refFunction, req, stateProps, ...document } = useForm("user")

  React.useEffect(() => {
    refFunction.current.onLoad = async function () {
      let res = undefined
      const _params = {
        page: 1,
        limit: 1000,
        fields: ["role"],
      }
      try {
        res = await req.POST(`/api/find/access`, { _params })
      } catch (err) {
        document.handleError(err)
      } finally {
        document.setTemp({
          roles: res?.data.result.map(({ role }: any) => ({
            value: role,
            label: role,
          })),
        })
      }
    }
  }, [])

  const actions = React.useMemo(() => {
    return [
      {
        icon: "save",
        type: "primary_1_bg",
        children: "Save",
        visible: stateProps.isEditable,
        onPress: document.handleSubmit(async (data) => {
          if (await document.save(data)) {
            document.close()
          }
        }),
      },
    ].filter((opt) => opt.visible)
  }, [stateProps.isEditable])

  return { ...document, stateProps, actions }
}
