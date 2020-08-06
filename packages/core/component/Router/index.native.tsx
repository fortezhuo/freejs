import { useHistory as useRRHistory, useLocation } from "react-router-native"

export const useHistory = () => {
  const { pathname } = useLocation()
  const { push } = useRRHistory()
  return { pathname, push }
}
