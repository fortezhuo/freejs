import React from "react"
import { configACL as acl } from "@free/env"
import { useDocument } from "../../state/hook"

export const useHook = () => {
  const user = useDocument("user")
  React.useEffect(() => {
    user.refFunction.current = {
      onBeforeSave: async (data) => {
        console.log("data", data)
      },
    }
  }, [])
  React.useEffect(() => {
    user.setTemp({
      roles: Object.keys(acl).map((role: any) => ({
        value: role,
        label: role,
      })),
    })
  }, [])

  const actions = React.useMemo(() => {
    return [
      {
        icon: "save",
        type: "primary_1_bg",
        children: "Save",
        onPress: user.handleSubmit(async (data) => {
          if (await user.save(data)) {
            user.close()
          }
        }),
      },
    ]
  }, [])

  return { ...user, actions }
}
