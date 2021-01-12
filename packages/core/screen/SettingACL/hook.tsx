import React from "react"
import { useDocument } from "../../state/hook"
import * as config from "./config"

export const useHook = () => {
  const { refFunction, req, stateProps, ...document } = useDocument("acl")

  React.useEffect(() => {
    refFunction.current.onLoad = async function () {
      let res = undefined
      const _params = {
        page: 1,
        limit: 1000,
        fields: ["role"],
      }
      try {
        res = await req.POST(`/api/find/acl`, { _params })
      } catch (err) {
        document.handleError(err)
      } finally {
        document.setTemp({
          inherit: res?.data.result.map(({ role }: any) => ({
            value: role,
            label: role,
          })),
          actions: config.actions.map((v) => ({ value: v, label: v })),
          target: config.target.map((v) => ({ value: v, label: v })),
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
        onPress: document.handleSubmit(async (data) => {
          if (await document.save(data)) {
            document.close()
          }
        }),
      },
    ]
  }, [])

  return { ...document, stateProps, actions }
}
