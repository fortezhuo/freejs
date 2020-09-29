import React, { FC, cloneElement, createRef } from "react"
import { StyleSheet, View, Text, ScrollView, Animated } from "react-native"
import { IconButton, IconLabel } from "../Icon"
import { InputCheckbox } from "../Input/InputCheckbox"
import { random } from "../../util/random"
import { tw, color } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { theme } from "../../config/theme"
import { RectButton } from "react-native-gesture-handler"
import Swipeable from "react-native-gesture-handler/Swipeable"
import { TableProps, IconButtonProps, RowProps, CellProps } from "@free/core"
import dayjs from "dayjs"
import { InputSelect } from "../Input/InputSelect"

const date = (date: any) => dayjs(date).format("DD MMM YYYY")
const datetime = (datetime: any) =>
  dayjs(datetime).format("DD MMM YYYY HH:mm:ss")

const primary = color(theme.input_text)

export const Table: FC<TableProps> = observer(
  ({ children, style, scroll, testID = "Table" }) => {
    const Wrapper: FC = ({ children }) =>
      scroll ? (
        <ScrollView scrollEnabled={scroll} horizontal testID="HorizontalScroll">
          {children}
        </ScrollView>
      ) : (
        <View style={{ flex: 1 }}>{children}</View>
      )

    return (
      <View
        testID={testID}
        style={StyleSheet.flatten([styles.viewTable, style])}
      >
        <View style={{ flex: 1 }}>
          <Wrapper>
            <View style={styles.viewTableChildren}>{children}</View>
          </Wrapper>
        </View>
      </View>
    )
  }
)

export const Pagination = observer(() => {
  return (
    <View style={styles.viewPage}>
      <Text>Showing 1 to 2 of 2 entries</Text>
      <View style={styles.viewPageNumbers}>
        <Text onPress={() => {}} style={styles.textPage}>
          First
        </Text>
        {[...Array(1)].map((_, i) => (
          <Text
            onPress={() => {}}
            style={StyleSheet.flatten([
              styles.textPage,
              i == 0 ? styles.textPageActive : {},
            ])}
          >
            {i + 1}
          </Text>
        ))}
        <Text onPress={() => {}} style={styles.textPage}>
          Last
        </Text>
      </View>
    </View>
  )
})

export const Header: FC<RowProps> = observer(({ children, style }) => {
  return (
    <Row style={StyleSheet.flatten([styles.viewHeader, style])}>{children}</Row>
  )
})

export const Row: FC<RowProps> = observer(
  ({ children, filter, dark, style, testID = "Row" }) => {
    return (
      <View
        testID={testID}
        style={StyleSheet.flatten([
          styles.viewRow,
          filter ? styles.rowFilter : {},
          dark ? styles.rowDark : {},
          style,
        ])}
      >
        {children}
      </View>
    )
  }
)

export const Cell: FC<CellProps> = observer(
  ({
    children: _children,
    type = "string",
    style,
    filter,
    testID = "Cell",
  }) => {
    const children =
      typeof _children !== "string"
        ? _children
        : type == "date"
        ? date(_children)
        : type == "datetime"
        ? datetime(_children)
        : _children

    return (
      <View
        testID={testID}
        style={StyleSheet.flatten([
          styles.viewCell,
          filter ? styles.cellFilter : {},
          style,
        ])}
      >
        <Text style={styles.textCell}>{children}</Text>
      </View>
    )
  }
)

export const CellLink: FC<IconButtonProps> = observer(
  ({ style, onPress, testID = "CellLink" }) => {
    return (
      <Cell style={style}>
        <IconButton
          testID={testID}
          name="link"
          size={16}
          color={primary}
          onPress={onPress}
        />
      </Cell>
    )
  }
)

export const CellCheckbox: FC<any> = observer(
  ({ style, testID = "CellCheckbox", ...rest }) => {
    return (
      <Cell style={style}>
        <InputCheckbox
          testID={testID}
          style={{ padding: 0, marginTop: -2 }}
          {...rest}
        />
      </Cell>
    )
  }
)

export const RowMobile: FC<RowProps> = observer(
  ({ store, name, data, label, dark, style, testID = "RowMobile" }) => {
    const path = `${name}/${data._id_link}`
    const ref = createRef<any>()
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
            alert("Delete")
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
                <RectButton onPress={onDelete} style={styles.cellDelete}>
                  <IconLabel
                    styleContainer={styles.iconDelete}
                    name="trash-2"
                  ></IconLabel>
                </RectButton>
              </Animated.View>
            </View>
          )
        }}
      >
        <RectButton onPress={() => store?.app.goto(path)}>
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
              return key === "_id_link" ? null : (
                <Text style={styles.textCellSmall} key={random()}>
                  {label[key] + " : " + data[key]}
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
  viewPage: tw("flex-row justify-between items-center p-1 shadow-sm"),
  viewPageNumbers: tw(
    "flex-row rounded-sm border-l border-t border-b border-gray-300"
  ),
  textPage: tw(
    "items-center px-4 py-2 bg-white text-sm text-gray-900 border-gray-300 border-r"
  ),
  textPageActive: tw(`bg-gray-300`),
  viewHeader: tw(`h-10 items-center shadow-md`),
  viewRow: tw(`${theme.table_border} flex-row flex-no-wrap`),
  viewCell: tw(`p-2 w-40 flex-grow`),
  rowDark: { backgroundColor: "rgba(0,0,0,0.08)" },
  rowFilter: tw(`bg-red-200 h-10 items-center`),
  rowMobile: tw("flex-col p-2"),
  cellFilter: { padding: 0 },
  cellDelete: tw("flex-1"),
  textCell: tw(theme.input_text),
  textCellSmall: tw(`${theme.input_text} text-sm`),
  iconDelete: tw(`${theme.danger} flex-row flex-1 justify-center items-center`),
})
