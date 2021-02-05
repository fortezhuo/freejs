import React from "react"
import { useApp } from "../../../state"
import { Platform } from "react-native"

export const useFocus = (ref: any, callback?: any) => {
  const { refScroll, refOffset, ...app } = useApp()

  const onFocus = React.useCallback(() => {
    if (Platform.OS === "web") {
      ref.current?.measureInWindow(
        (
          left: number,
          top: number,
          anchorWidth: number,
          anchorHeight: number
        ) => {
          const { y = 0 } = refOffset?.current || {}
          const overflowTop = top - 120
          const overflowBottom = app.temp.height - top - anchorHeight - 20

          if (refScroll.current) {
            if (overflowTop < 0) {
              refScroll.current.scrollTo({
                x: 0,
                y: y + overflowTop,
                animated: 1,
              })
            }

            if (overflowBottom < 0) {
              refScroll.current.scrollTo({
                x: 0,
                y: y + Math.abs(overflowBottom),
                animated: 1,
              })
            }
          }
        }
      )
    }

    if (callback) {
      callback()
    }
    ref.current?.focus()
  }, [])
  return onFocus
}
