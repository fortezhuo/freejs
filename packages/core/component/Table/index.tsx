import React, { FC, createRef } from "react"
import { StyleSheet, View, Text, ScrollView, Animated } from "react-native"
import { TableProps, RowProps, CellProps } from "@free/core"
import { Icon, IconLabel, Link } from ".."
import { random } from "../../util/random"
import { tw, color } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { theme } from "../../config/theme"
import { download } from "./helper"
import { RectButton } from "react-native-gesture-handler"
import Swipeable from "react-native-gesture-handler/Swipeable"
import dayjs from "dayjs"

const defaultColor = color(theme.default_text)
const date = (date: any) => dayjs(date).format("DD MMM YYYY")
const datetime = (datetime: any) =>
  dayjs(datetime).format("DD MMM YYYY HH:mm:ss")

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

const getNum = (num: number, delim: number, stop: number): number => {
  const nDelim = delim < 0 ? delim + 1 : delim - 1
  if (stop == 0) {
    return num + delim > stop ? num + delim : getNum(num, nDelim, stop)
  } else {
    return num + delim <= stop ? num + delim : getNum(num, nDelim, stop)
  }
}

const pageBetween = (start: number, end: number) => {
  start = getNum(start, -2, 0)
  end = getNum(start, +5, end)
  const pages = [...Array(end - start + 1)].map((_, i) => start + i)
  return pages
}

export const Pagination: FC<any> = observer(({ store }) => {
  const page = store.data.get("page") || 1
  const max = store.data.get("max") || 1
  const limit = store.data.get("limit")
  const total = store.data.get("total")
  const desc = `Showing ${(page - 1) * limit + 1} to ${
    page * limit < total ? page * limit : total
  } of ${total} entries`

  return (
    <View style={styles.viewPage}>
      {total ? (
        <>
          <Text>{desc}</Text>
          <View style={styles.viewPageNumbers}>
            <Text onPress={() => {}} style={styles.textPage}>
              First
            </Text>
            {pageBetween(page, max).map((_, i) => (
              <Text
                key={"page_" + random()}
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
        </>
      ) : (
        <Text>No Data Found</Text>
      )}
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
  ({ children, style, filter, testID = "Cell" }) => {
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

export const CellLink: FC<CellProps> = observer(
  ({ style, name = "link", link }) => {
    return (
      <Cell style={style} testID="CellLink">
        <Link href={link}>
          <Icon name={name} size={16} color={defaultColor} />
        </Link>
      </Cell>
    )
  }
)

export const RowMobile: FC<RowProps> = observer(
  ({ store, data, keys, dark, style, testID = "RowMobile", actDelete }) => {
    const path = data._id_link ? `${store.name}/${data._id_link}` : null
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
                <Text style={styles.textCellSmall} key={random()}>
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

export const useDefaultColumn = (store: any) => {
  return {
    Cell: (cell: any) => {
      switch (cell.column.type) {
        case "link":
          return (
            <CellLink
              store={store}
              link={`${store.name}/${cell.value}`}
              style={cell.column.style}
            />
          )
        case "download_log":
          return (
            <CellLink
              name="download"
              style={cell.column.style}
              onPress={() => {
                download(`/api/${store.name}`, cell.value)
              }}
            />
          )
        case "date":
          return <Cell style={cell.column.style}>{date(cell.value)}</Cell>
        case "datetime":
          return <Cell style={cell.column.style}>{datetime(cell.value)}</Cell>
        default:
          return <Cell style={cell.column.style}>{cell.value}</Cell>
      }
    },
  }
}

const styles = StyleSheet.create({
  viewTable: tw(`shadow-xl`),
  viewTableChildren: tw("flex-col flex-1"),
  viewPage: tw("flex-row justify-between items-center p-1 shadow-sm h-10"),
  viewPageNumbers: tw(
    "flex-row rounded-sm border-l border-t border-b border-gray-300"
  ),
  textPage: tw(
    "items-center px-4 py-2 bg-white text-sm text-gray-900 border-gray-300 border-r"
  ),
  textPageActive: tw(`bg-gray-300`),
  viewHeader: tw(`h-10 items-center shadow-md`),
  viewRow: tw(`flex-row flex-no-wrap`),
  viewCell: tw(`p-2 w-40 flex-grow`),
  rowDark: { backgroundColor: "rgba(0,0,0,0.08)" },
  rowFilter: tw(`bg-red-200 h-10 items-center`),
  rowMobile: tw("flex-col p-2"),
  cellFilter: { padding: 0 },
  cellDelete: tw("flex-1"),
  textCell: tw(theme.default_text),
  textCellSmall: tw(`${theme.default_text} text-sm`),
  iconDelete: tw(
    `${theme.danger_bg} flex-row flex-1 justify-center items-center`
  ),
})
