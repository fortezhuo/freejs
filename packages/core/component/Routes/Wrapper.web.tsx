import React from "react"
import { View } from "react-native"
export const Wrapper: React.FC<any> = ({ isMobile, children }) => {
  const interval = React.useRef<any>(null)
  const timeout = React.useRef<any>(null)

  const cleanInterval = React.useCallback(() => {
    if (interval.current) {
      clearInterval(interval.current)
    }
  }, [])

  const cleanTimeout = React.useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
  }, [])

  React.useEffect(() => {
    if (!isMobile) {
      interval.current = setInterval(() => {
        const parent = document.querySelector('[data-testid="DrawerWrapper"]')
          ?.parentElement
        if (parent) {
          parent.style.left = "0px"
          if (parent.style.left === "0px") {
            timeout.current = setTimeout(() => {
              cleanInterval()
            }, 500)
          }
        }
      }, 100)
    } else {
      cleanTimeout()
      cleanInterval()
    }

    return () => {
      cleanTimeout()
      cleanInterval()
    }
  }, [isMobile])

  return (
    <View testID="DrawerWrapper" style={{ flex: 1 }}>
      {children}
    </View>
  )
}
