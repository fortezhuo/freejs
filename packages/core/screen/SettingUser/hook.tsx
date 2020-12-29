import React from "react"
import { configACL as acl } from "@free/env"
import { useDocument } from "../../state/hook"

export const useHook = () => {
  const document = useDocument("user")
  React.useEffect(() => {
    document.setTemp({
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
        onPress: document.handleSubmit(async (data) => {
          if (await document.save(data)) {
            document.close()
          }
        }),
      },
    ]
  }, [])

  return { ...document, actions }
}
