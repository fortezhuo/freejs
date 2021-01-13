import React from "react"
import { StyleSheet, View, Animated } from "react-native"
import { RectButton } from "react-native-gesture-handler"
import { Icon, Table } from "../../component"
import { theme } from "../../config/theme"
import { tw } from "@free/tailwind"
import { useView } from "./hook"
import { POST } from "../../request"
import { useNavigation } from "@react-navigation/native"
import Swipeable from "react-native-gesture-handler/Swipeable"

const RowMobile: React.FC<any> = ({
  data,
  actionLeft,
  actionRight,
  setContent,
  children,
  dark,
  style,
}) => {
  const width = 88
  const { refBottomSheet, ...view } = useView()
  const ref = React.createRef<any>()
  const navigation = useNavigation()
  const params = {
    id: data._id_json || data._id_link,
  }

  const onTap = React.useCallback(() => {
    if (!!data._id_json) {
      ;(async () => {
        try {
          const res = await POST(`/api/find/trash/${data._id_json}`, {})
          setContent(res.data.result.data)
        } catch (err) {
          view.setError(err)
        } finally {
          refBottomSheet.current.open()
        }
      })()
    } else {
      const route = view.data.route.replace("View", "")
      if (route !== "SettingLog") {
        navigation.navigate(route, { id: data._id_link })
      }
    }
  }, [data._id_json, data._id_link])

  const renderLeftAction = React.useCallback(
    (progress: any) => {
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
              <View style={[s.swipeButton, tw(theme[actionLeft.type])]}>
                <Icon name={actionLeft.icon} />
              </View>
            </RectButton>
          </Animated.View>
        </View>
      )
    },
    [ref.current]
  )

  const renderRightAction = React.useCallback(
    (progress: any) => {
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
              <View style={[s.swipeButton, tw(theme[actionRight.type])]}>
                <Icon name={actionRight.icon} />
              </View>
            </RectButton>
          </Animated.View>
        </View>
      )
    },
    [ref.current]
  )

  return (
    <Swipeable
      ref={ref}
      friction={2}
      leftThreshold={30}
      rightThreshold={30}
      useNativeAnimations={false}
      renderLeftActions={actionLeft && renderLeftAction}
      renderRightActions={actionRight && renderRightAction}
    >
      <RectButton onPress={onTap}>
        <View style={[s.rowMobile, dark ? s.rowDark : {}, style]}>
          {React.Children.map(children, (child: any) => {
            return React.cloneElement(child, { isMobile: true })
          })}
        </View>
      </RectButton>
    </Swipeable>
  )
}

export const TableRow: React.FC<any> = ({
  data,
  actionLeft,
  actionRight,
  refBottomSheet,
  children,
  dark,
  isMobile,
  style,
}) => {
  const Wrapper: any = isMobile ? RowMobile : Table.Row

  return (
    <Wrapper
      {...{ dark, style, data, actionLeft, actionRight, refBottomSheet }}
    >
      {children}
    </Wrapper>
  )
}

const s = StyleSheet.create({
  viewHeader: tw(`h-12 shadow-md`),
  viewRow: tw(`flex-row items-center`),
  rowDark: { backgroundColor: "rgba(0,0,0,0.08)" },
  rowMobile: tw("flex-col p-2"),
  textCellSmall: tw(`${theme.default_text} text-sm`),
  cellDelete: tw("flex-1"),
  swipeButton: tw(
    `${theme.danger_bg} flex-row flex-1 justify-center items-center`
  ),
})
