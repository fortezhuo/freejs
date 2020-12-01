import React from "react"
import { StyleSheet, View, Animated } from "react-native"
import { RectButton } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import Swipeable from "react-native-gesture-handler/Swipeable"
import { IconLabel } from ".."
import { observer } from "mobx-react-lite"
import { theme } from "../../config/theme"
import { tw } from "@free/tailwind"
import { RowProps } from "@free/core"

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

export const RowData: React.FC<RowProps> = observer(
  ({
    store,
    data,
    children,
    dark,
    isMobile,
    style,
    testID = "RowMobile",
    actionLeft,
    actionRight,
  }) => {
    const params = {
      name: store.name,
      id: data._id_json || data._id_link,
    }
    const navigation = useNavigation()
    const ref = React.createRef<any>()
    const width = 88

    const onTap = React.useCallback(() => {
      if (!isMobile) return null

      if (data._id_json) {
        ;(async () => {
          store.setData({ value: [] })
          await store.loadData(data._id_json)
          store.bottomSheet.open()
        })()
      } else {
        try {
          store.set("isUpdating", true)
          const route = store.data.get("route").replace("View", "")
          navigation.navigate(route, { id: data._id_link })
        } finally {
          store.set("isUpdating", false)
        }
      }
    }, [isMobile])

    const renderLeftAction =
      actionLeft &&
      React.useCallback((progress: any) => {
        const trans = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [-width, 0],
        })
        const onPress = () => {
          ref?.current.close()
          actionLeft.onPress(params)
        }
        return (
          <View
            style={{
              width,
            }}
          >
            <Animated.View
              style={{ flex: 1, transform: [{ translateX: trans }] }}
            >
              <RectButton onPress={onPress} style={s.cellDelete}>
                <IconLabel
                  styleContainer={[s.swipeButton, tw(theme[actionLeft.type])]}
                  name={actionLeft.icon}
                ></IconLabel>
              </RectButton>
            </Animated.View>
          </View>
        )
      }, [])

    const renderRightAction =
      actionRight &&
      React.useCallback((progress: any) => {
        const trans = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [width, 0],
        })
        const onPress = () => {
          ref?.current.close()
          actionRight.onPress(params)
        }
        return (
          <View
            style={{
              width,
            }}
          >
            <Animated.View
              style={{ flex: 1, transform: [{ translateX: trans }] }}
            >
              <RectButton onPress={onPress} style={s.cellDelete}>
                <IconLabel
                  styleContainer={[s.swipeButton, tw(theme[actionRight.type])]}
                  name={actionRight.icon}
                ></IconLabel>
              </RectButton>
            </Animated.View>
          </View>
        )
      }, [])

    return (
      <Swipeable
        ref={ref}
        friction={2}
        leftThreshold={30}
        rightThreshold={40}
        useNativeAnimations={false}
        renderLeftActions={renderLeftAction}
        renderRightActions={renderRightAction}
      >
        <RectButton onPress={onTap}>
          <View
            testID={testID}
            style={[
              s.viewRow,
              dark ? s.rowDark : {},
              isMobile ? s.rowMobile : {},
              style,
            ]}
          >
            {React.Children.map(children, (child: any) => {
              return React.cloneElement(child, { isMobile })
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
  swipeButton: tw(
    `${theme.danger_bg} flex-row flex-1 justify-center items-center`
  ),
})
