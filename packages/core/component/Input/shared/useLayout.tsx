import React from "react"
import { useApp } from "../../../state"

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
          ;(async () => {
            let { keyboardHeight } = app.temp
            const { y = 0 } = refOffset?.current || {}

            setMeasure({
              left,
              top:
                refScroll.current && keyboardHeight !== 0
                  ? keyboardHeight - anchorHeight - 150
                  : top,
              anchorHeight,
              anchorWidth,
            })

            if (refScroll.current) {
              refScroll.current.scrollTo({
                x: 0,
                y: top - keyboardHeight + 150 + anchorHeight + y,
              })
            }
          })()
        }
      )
    }
  }, [app.temp.screen, focus])

  const { width } = layout
  let { left, top, anchorHeight } = measure

  top += anchorHeight

  const style = {
    width: search ? width : undefined,
    left,
    top,
    opacity: top == 0 ? 0 : 1,
  }

  return [style, onLayout]
}
