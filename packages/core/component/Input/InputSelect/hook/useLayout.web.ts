import React from "react"
import { useApp } from "../../../../state"

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
          const { y = 0 } = refOffset?.current || {}
          const overflowTop = top - 120
          const overflowBottom = app.temp.height - top - anchorHeight - 185

          if (overflowTop < 0) {
            refScroll.current.scrollTo({
              x: 0,
              y: y + overflowTop,
            })
          }

          if (overflowBottom < 0) {
            refScroll.current.scrollTo({
              x: 0,
              y: y + Math.abs(overflowBottom),
            })
          }

          top =
            overflowTop < 0
              ? 120
              : overflowBottom < 0
              ? top + overflowBottom
              : top

          setMeasure({
            left,
            top,
            anchorHeight,
            anchorWidth,
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
