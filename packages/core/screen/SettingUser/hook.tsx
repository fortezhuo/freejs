import { useEffect, useMemo } from "react"
import { useStore, useEvent } from "../../component"
import { configACL as acl } from "@free/env"

export const useHook = () => {
  const { user } = useStore()
  const event = useEvent(user)
  const actions = useMemo(() => {
    return [
      {
        icon: "save",
        type: "primary_1_bg",
        children: "Save",
        onPress: async () => await event.save(),
        visible: true,
      },
      {
        icon: "log-out",
        type: "danger_bg",
        children: "Close",
        onPress: event.close,
        visible: true,
      },
    ]
  }, [])

  useEffect(() => {
    user?.app?.set("isForm", true)
    user.setTemp({
      roles: Object.keys(acl).map((role: any) => ({
        value: role,
        label: role,
      })),
    })
    return () => {
      user?.app?.set("isForm", false)
    }
  }, [])

  return { user, actions }
}
