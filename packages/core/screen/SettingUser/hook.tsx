import React from "react"
import { useStore, useEvent } from "../../component"
import { configACL as acl } from "@free/env"
import { useFocusEffect } from "@react-navigation/native"

export const useHook = () => {
  const { user } = useStore()
  const event = useEvent(user)
  const actions = React.useMemo(() => {
    return [
      {
        icon: "save",
        type: "primary_1_bg",
        children: "Save",
        onPress: async () => await event.save(),
        visible: true,
      },
    ]
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      user.setTemp({
        roles: Object.keys(acl).map((role: any) => ({
          value: role,
          label: role,
        })),
      })
      return () => {
        user.clear()
      }
    }, [])
  )

  return { user, actions }
}
