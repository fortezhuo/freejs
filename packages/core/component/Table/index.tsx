import React from "react"
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Animated,
  TouchableOpacity,
} from "react-native"
import { Modalize } from "react-native-modalize"
import { TableProps, RowProps, CellProps } from "@free/core"
import { IconButton, IconLabel, Icon, Link } from ".."
import { random } from "../../util/random"
import { tw, color } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { theme } from "../../config/theme"
import { RectButton } from "react-native-gesture-handler"
import Swipeable from "react-native-gesture-handler/Swipeable"
import dayjs from "dayjs"
import { getDebugName } from "mobx"
export { useDefaultColumn } from "./hook"

const date = (date: any) => dayjs(date).format("DD MMM YYYY")
const datetime = (datetime: any) =>
  dayjs(datetime).format("DD MMM YYYY HH:mm:ss")

const defaultColor = color(theme.default_text)

export const TableScroll: React.FC<TableProps> = ({
  children,
  style,
  scroll,
  testID = "Table",
}) => {
  return (
    <View testID={testID} style={StyleSheet.flatten([styles.viewTable, style])}>
      <ScrollView horizontal scrollEnabled={scroll} testID="HorizontalScroll">
        <View style={styles.viewTableChildren}>{children}</View>
      </ScrollView>
    </View>
  )
}

export const Table: React.FC<TableProps> = ({
  children,
  style,
  testID = "Table",
}) => {
  return (
    <View testID={testID} style={StyleSheet.flatten([styles.viewTable, style])}>
      <View style={styles.viewTableChildren}>{children}</View>
    </View>
  )
}

export const Header: React.FC<RowProps> = ({ children, style }) => {
  return (
    <Row style={StyleSheet.flatten([styles.viewHeader, style])}>{children}</Row>
  )
}

export const Row: React.FC<RowProps> = ({
  children,
  dark,
  style,
  testID = "Row",
}) => {
  return (
    <View
      testID={testID}
      style={StyleSheet.flatten([
        styles.viewRow,
        dark ? styles.rowDark : {},
        style,
      ])}
    >
      {children}
    </View>
  )
}

export const Cell: React.FC<CellProps> = ({
  children,
  style,
  testID = "Cell",
}) => {
  return (
    <View testID={testID} style={StyleSheet.flatten([styles.viewCell, style])}>
      {children}
    </View>
  )
}

export const CellText: React.FC<CellProps> = ({
  children,
  style,
  testID = "CellText",
}) => {
  return (
    <Cell style={style} testID={testID}>
      <Text style={styles.textCell}>{children}</Text>
    </Cell>
  )
}

export const CellLink: React.FC<CellProps> = ({
  style,
  name = "link",
  link,
}) => {
  return (
    <Cell style={style} testID="CellLink">
      <Link path={link}>
        <Icon name={name} size={16} color={defaultColor} />
      </Link>
    </Cell>
  )
}

export const CellDownload: React.FC<CellProps> = ({
  style,
  name = "download",
  onPress,
}) => {
  return (
    <Cell style={style} testID="CellLink">
      <IconButton
        onPress={onPress}
        name={name}
        size={16}
        color={defaultColor}
      />
    </Cell>
  )
}

export const CellJSON: React.FC<CellProps> = ({ store, style, children }) => {
  const onOpen = React.useCallback(() => {
    store.temp.set("value", children)
    store.modalData.current?.open()
  }, [])

  return (
    <Cell style={style}>
      <IconButton
        onPress={onOpen}
        name="search"
        size={16}
        color={defaultColor}
      />
    </Cell>
  )
}

export const ModalJSON: React.FC<any> = observer(({ store }) => {
  const value = store.temp.get("value") || {}
  const data = Object.keys(value).map((key) => ({
    key,
    value: value[key],
  }))
  return (
    <Modalize
      ref={store.modalData}
      adjustToContentHeight
      flatListProps={{
        data,
        renderItem: ({ item, index }: any) => {
          return (
            <Row dark={index % 2}>
              <View style={{ width: 100 }}>
                <CellText>{item.key}</CellText>
              </View>
              <CellText>{item.value}</CellText>
            </Row>
          )
        },
        keyExtractor: (item) => item.key,
        showsVerticalScrollIndicator: false,
      }}
    ></Modalize>
  )
})

export const ModalFilter: React.FC<any> = observer(({ store }) => {
  return (
    <Modalize ref={store.modalFilter} adjustToContentHeight>
      <CellText>FILTER</CellText>
    </Modalize>
  )
})

export const RowMobile: React.FC<RowProps> = observer(
  ({ store, data, keys, dark, style, testID = "RowMobile", actDelete }) => {
    const path = data._id_link ? `${store.name}/${data._id_link}` : null
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
                  <RectButton onPress={onDelete} style={styles.cellDelete}>
                    <IconLabel
                      styleContainer={styles.iconDelete}
                      name="trash-2"
                    ></IconLabel>
                  </RectButton>
                </Animated.View>
              </View>
            )
          )
        }}
      >
        <RectButton
          onPress={() => {
            if (path) store?.app.goto(path)
          }}
        >
          <View
            testID={testID}
            style={StyleSheet.flatten([
              styles.viewRow,
              styles.rowMobile,
              dark ? styles.rowDark : {},
              style,
            ])}
          >
            {Object.keys(data).map((key) => {
              if (key === "_id_link") return null
              const label = keys[key].label
              let value = data[key]
              switch (keys[key].type) {
                case "datetime":
                  value = datetime(value)
                case "date":
                  value = date(value)
              }
              return key === "_id_link" ? null : (
                <Text
                  numberOfLines={1}
                  style={styles.textCellSmall}
                  key={random()}
                >
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

const styles = StyleSheet.create({
  viewTable: tw(`shadow-xl`),
  viewTableChildren: tw("flex-col flex-1"),
  viewHeader: tw(`h-12 shadow-md`),
  viewRow: tw(`flex-row flex-no-wrap items-center`),
  viewCell: tw(`p-2 w-40 flex-grow flex-row`),
  rowDark: { backgroundColor: "rgba(0,0,0,0.08)" },
  rowMobile: tw("flex-col p-2 items-start"),
  cellFilter: tw("p-0 pr-1"),
  cellDelete: tw("flex-1"),
  textCell: tw(theme.default_text),
  textCellSmall: tw(`${theme.default_text} text-sm`),
  iconDelete: tw(
    `${theme.danger_bg} flex-row flex-1 justify-center items-center`
  ),
})
