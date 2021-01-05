import React from "react"
import { configACL as acl } from "@free/env"
import { useDocument } from "../../state/hook"

export const useHook = () => {
  const { refFunction, state, ...document } = useDocument("user")

  React.useEffect(() => {
    refFunction.current.onLoad = async function () {
      if (document.getId() === "new") {
        await document.setData({
          _docAuthors: ["Admin"],
        })
      }
    }

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
        visible: state.isEditable,
        onPress: document.handleSubmit(async (data) => {
          if (await document.save(data)) {
            document.close()
          }
        }),
      },
    ].filter((opt) => opt.visible)
  }, [state.isEditable])

  return { ...document, actions }
}
