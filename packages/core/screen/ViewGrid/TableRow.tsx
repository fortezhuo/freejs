import React from "react"
import { StyleSheet, View, Animated } from "react-native"
import { RectButton } from "react-native-gesture-handler"
import { Icon, Row } from "../../component"
import { theme } from "../../config/theme"
import { tw } from "@free/tailwind"
import { RowProps } from "@free/core"
import { useNavigation } from "@react-navigation/native"
import Swipeable from "react-native-gesture-handler/Swipeable"

const RowMobile: React.FC<any> = ({
  name,
  data,
  actionLeft,
  actionRight,
  children,
  dark,
  style,
}) => {
  const params = {
    id: data._id_json || data._id_link,
  }
  const ref = React.createRef<any>()
  const navigation = useNavigation()
  const width = 88
  const onTap = React.useCallback(() => {
    if (data._id_json !== 24) {
      ;(async () => {
        try {
          if (id.length !== 24) {
            throw new Error("Invalid ID")
          }
          const res = await POST(`/api/find/trash/${id}`, {})
          setContent(res.data.result.data)
        } catch (err) {
          view.setError(err)
        } finally {
          refBottomSheet.current.open()
        }
      })()
      ;(async () => {
        store.setData({ value: [] })
        await store.loadData(data._id_json)
        store.bottomSheet.open()
      })()
    } else {
      const route = store.data.get("route").replace("View", "")
      if (route !== "SettingLog") {
        navigation.navigate(route, { id: data._id_link })
      }
    }
  }, [])

  const renderLeftAction = React.useCallback((progress: any) => {
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
        <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
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

  const renderRightAction = React.useCallback((progress: any) => {
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
        <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
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
  name,
  data,
  actionLeft,
  actionRight,
  children,
  dark,
  isMobile,
  style,
}) => {
  const Wrapper: any = Row

  return (
    <Wrapper
      dark={dark}
      style={style}
      data={data}
      actionLeft={actionLeft}
      actionRight={actionRight}
    >
      {children}
    </Wrapper>
  )
}

const s = StyleSheet.create({
  viewHeader: tw(`h-12 shadow-md`),
  viewRow: tw(`flex-row flex-no-wrap items-center`),
  rowDark: { backgroundColor: "rgba(0,0,0,0.08)" },
  rowMobile: tw("flex-col p-2"),
  textCellSmall: tw(`${theme.default_text} text-sm`),
  cellDelete: tw("flex-1"),
  swipeButton: tw(
    `${theme.danger_bg} flex-row flex-1 justify-center items-center`
  ),
})
