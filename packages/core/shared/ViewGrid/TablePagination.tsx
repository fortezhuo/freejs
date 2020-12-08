import React from "react"
import { View, StyleSheet } from "react-native"
import { Text, Input, Loader } from "../../component"
import { observer } from "mobx-react-lite"
import { random } from "../../util"
import { tw } from "@free/tailwind"
import { TouchableOpacity } from "react-native-gesture-handler"

const limitOptions: any = [10, 20, 30, 40, 50, 60, 70, 80].map(
  (opt: number) => ({
    value: `${opt}`,
    label: `${opt}`,
  })
)

const pagination = (c: number, m: number) => {
  let current = c,
    last = m,
    delta = 2,
    left = current - delta,
    right = current + delta + 1,
    range = [],
    rangeWithDots = [],
    l

  for (let i = 1; i <= last; i++) {
    if (i == 1 || i == last || (i >= left && i < right)) {
      range.push(i)
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l !== 1) {
        rangeWithDots.push("...")
      }
    }
    rangeWithDots.push(i)
    l = i
  }

  return rangeWithDots
}

export const TablePagination: React.FC<any> = observer(({ store, page }) => {
  const { index, total, max, goto } = page

  const setPage = React.useCallback((i) => {
    goto(i)
    store.setData({ page: i })
  }, [])

  const reset = React.useCallback(() => {
    store.setData({ page: 1 })
  }, [])

  return total ? (
    <View style={s.viewPage}>
      <View style={s.viewPaging}>
        {!store.isLoading && (
          <>
            <Text>Show</Text>
            <Input.Select
              style={s.boxPaging}
              clearable={false}
              searchable={false}
              data-name="limit"
              name="limit"
              placeholder="Limit"
              store={store}
              options={limitOptions}
              onChange={reset}
            />
            <Text>entries</Text>
          </>
        )}
      </View>
      <View style={s.viewPageNumbers}>
        {pagination(index, max).map((i: any) => (
          <TouchableOpacity
            key={"page_" + random()}
            disabled={i === "..." || i == page}
            onPress={() => setPage(i)}
          >
            <Text style={[s.textPage, i == index ? s.textPageActive : {}]}>
              {i}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  ) : (
    <></>
  )
})

const s = StyleSheet.create({
  viewPage: tw("flex-row justify-between items-center p-1 shadow-sm h-10"),
  viewPageNumbers: tw(
    "flex-row rounded-sm border-l border-t border-b border-gray-300"
  ),
  viewPaging: tw("flex-row items-center justify-between", { width: 130 }),
  boxPaging: { height: 35 },
  textPage: tw(
    "items-center px-4 py-2 bg-white text-sm text-gray-900 border-gray-300 border-r"
  ),
  textPageActive: tw(`bg-gray-300`),
})
