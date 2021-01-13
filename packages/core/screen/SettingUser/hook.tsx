import React from "react"
import { useDocument } from "../../state/hook"

export const useHook = () => {
  const { refFunction, stateProps, ...document } = useDocument("user")

  React.useEffect(() => {
    refFunction.current.onLoad = async function () {
      if (document.id === "new") {
        await document.setData({
          _docAuthors: ["Admin"],
        })
      }
    }

    /*
    document.setTemp({
      roles: Object.keys(acl).map((role: any) => ({
        value: role,
        label: role,
      })),
    })
    */
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
