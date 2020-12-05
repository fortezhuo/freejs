import { useCallback } from "react"
import { useNavigation } from "@react-navigation/native"

export const useEvent = (store: any) => {
  const navigation = useNavigation()
  const save = useCallback(async () => {
    if (await store.save()) {
      navigation.goBack()
    }
  }, [])
  const close = useCallback(() => {
    navigation.goBack()
  }, [])

  return {
    save,
    close,
  }
}
