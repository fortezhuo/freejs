import React from "react"
import { useApp } from "../../../state"

const SCREEN_INDENT = 2

export const useLayout = (refLayout: any, focus: boolean, search: boolean) => {
  const { refScroll, refOffset, ...app } = useApp()
  const [layout, setLayout] = React.useState<JSONObject>({
    width: 0,
    height: 0,
  })
  const [measure, setMeasure] = React.useState<JSONObject>({
    top: 0,
    left: 0,
    anchorWidth: 0,
    anchorHeight: 0,
  })

  const onLayout = React.useCallback(
    (e: any) => {
      const { width, height } = e.nativeEvent.layout

      setLayout({
        width: Math.max(192, width, measure.anchorWidth),
        height,
      })
    },
    [measure.anchorWidth]
  )

  React.useEffect(() => {
    if (focus) {
      refLayout.current?.measureInWindow(
        (
          left: number,
          top: number,
          anchorWidth: number,
          anchorHeight: number
        ) => {
          const { keyboardHeight } = app.temp
          const { y = 0 } = refOffset?.current || {}

          setMeasure({
            left,
            top: keyboardHeight - anchorHeight,
            anchorHeight,
            anchorWidth,
          })
          refScroll.current.scrollTo({
            x: 0,
            y: top - keyboardHeight + anchorHeight + y,
            animated: 1,
          })
        }
      )
    }
  }, [app.temp.screen, focus])

  const { width } = layout
  let { left, top, anchorHeight } = measure

  if (left > app.temp.width - width - SCREEN_INDENT) {
    left = app.temp.width - SCREEN_INDENT - width
  } else if (left < SCREEN_INDENT) {
    left = SCREEN_INDENT
  }

  top += anchorHeight

  const style = {
    width: search ? width : undefined,
    left,
    top,
    opacity: top == 0 ? 0 : 1,
  }

  return [style, onLayout]
}
