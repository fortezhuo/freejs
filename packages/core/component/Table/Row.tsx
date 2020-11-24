import React from "react"
import { StyleSheet, View, Text, Animated } from "react-native"
import { RectButton } from "react-native-gesture-handler"
import Swipeable from "react-native-gesture-handler/Swipeable"
import { IconLabel } from ".."
import { observer } from "mobx-react-lite"
import { random } from "../../util"
import { theme } from "../../config/theme"
import { tw } from "@free/tailwind"
import { RowProps } from "@free/core"
import { date, datetime } from "./helper"

export const Row: React.FC<RowProps> = ({
  children,
  dark,
  style,
  testID = "Row",
}) => {
  return (
    <View testID={testID} style={[s.viewRow, dark ? s.rowDark : {}, style]}>
      {children}
    </View>
  )
}

export const RowMobile: React.FC<RowProps> = observer(
  ({ store, data, keys, dark, style, testID = "RowMobile", actDelete }) => {
    const onTap = React.useCallback(() => {
      if (data._id_json) {
        ;(async () => {
          await store.loadData(data._id_json)
          store.bottomSheet.open()
        })()
      } else {
        const path = data._id_link ? `${store.name}/${data._id_link}` : null
        if (path) store?.app.goto(path)
      }
    }, [])

    const ref = React.createRef<any>()
    const width = 88
    return (
      <Swipeable
        ref={ref}
        friction={2}
        leftThreshold={30}
        rightThreshold={40}
        useNativeAnimations={false}
        renderRightActions={(progress: any) => {
          const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [width, 0],
          })
          const onDelete = () => {
            ref?.current.close()
            actDelete.onPress()
          }
          return (
            actDelete && (
              <View
                style={{
                  width,
                }}
              >
                <Animated.View
                  style={{ flex: 1, transform: [{ translateX: trans }] }}
                >
                  <RectButton onPress={onDelete} style={s.cellDelete}>
                    <IconLabel
                      styleContainer={s.iconDelete}
                      name="trash-2"
                    ></IconLabel>
                  </RectButton>
                </Animated.View>
              </View>
            )
          )
        }}
      >
        <RectButton onPress={onTap}>
          <View
            testID={testID}
            style={[s.viewRow, s.rowMobile, dark ? s.rowDark : {}, style]}
          >
            {Object.keys(data).map((key) => {
              if (key === "_id_link" || key === "_id_json") return null
              const label = keys[key].label
              let value = data[key]
              switch (keys[key].type) {
                case "datetime":
                  value = datetime(value)
                case "date":
                  value = date(value)
              }
              return key === "_id_link" || key === "_id_json" ? null : (
                <Text numberOfLines={1} style={s.textCellSmall} key={random()}>
                  {label + " : " + value}
                </Text>
              )
            })}
          </View>
        </RectButton>
      </Swipeable>
    )
  }
)

export const Header: React.FC<RowProps> = ({ children, style }) => {
  return <Row style={[s.viewHeader, style]}>{children}</Row>
}

const s = StyleSheet.create({
  viewHeader: tw(`h-12 shadow-md`),
  viewRow: tw(`flex-row flex-no-wrap items-center`),
  rowDark: { backgroundColor: "rgba(0,0,0,0.08)" },
  rowMobile: tw("flex-col p-2 items-start"),
  textCellSmall: tw(`${theme.default_text} text-sm`),
  cellDelete: tw("flex-1"),
  iconDelete: tw(
    `${theme.danger_bg} flex-row flex-1 justify-center items-center`
  ),
})
