import React from "react"
import { View, StyleSheet } from "react-native"
import { Text } from "../../component"
import { observer } from "mobx-react-lite"
import { random } from "../../util/random"
import { tw } from "@free/tailwind"
import { TouchableOpacity } from "react-native-gesture-handler"

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
  const { index, limit, total, max, goto } = page
  const desc = `Showing ${(index - 1) * limit + 1} to ${
    index * limit < total ? index * limit : total
  } of ${total} entries`

  const setPage = React.useCallback((i) => {
    goto(i)
    store.setData({ page: i })
  }, [])

  return (
    <View style={s.viewPage}>
      {total ? (
        <>
          <Text>{desc}</Text>
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
        </>
      ) : (
        <Text>No Data Found</Text>
      )}
    </View>
  )
})

const s = StyleSheet.create({
  viewPage: tw("flex-row justify-between items-center p-1 shadow-sm h-10"),
  viewPageNumbers: tw(
    "flex-row rounded-sm border-l border-t border-b border-gray-300"
  ),
  textPage: tw(
    "items-center px-4 py-2 bg-white text-sm text-gray-900 border-gray-300 border-r"
  ),
  textPageActive: tw(`bg-gray-300`),
})
