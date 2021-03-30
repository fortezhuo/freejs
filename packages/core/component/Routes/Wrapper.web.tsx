import React from "react"
import { View } from "react-native"
export const Wrapper: React.FC<any> = ({ isMobile, children }) => {
  const ref = React.useRef<any>(null)

  React.useEffect(() => {
    ref.current = setTimeout(() => {
      const parent = document.querySelector('[data-testid="DrawerWrapper"]')
        ?.parentElement

      if (parent) {
        const isHideleft = parent.style.left.indexOf("-") >= 0
        if (!isMobile && isHideleft) {
          parent.style.left = "0px"
        }
      }
    }, 100)

    return () => {
      clearTimeout(ref.current)
    }
  }, [isMobile])

  return (
    <View testID="DrawerWrapper" style={{ flex: 1 }}>
      {children}
    </View>
  )
}
