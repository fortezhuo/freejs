import { useHistory as useRRHistory, useLocation } from "react-router-dom"

export const useHistory = () => {
  const { pathname } = useLocation()
  const { push } = useRRHistory()
  return { pathname, push }
}
