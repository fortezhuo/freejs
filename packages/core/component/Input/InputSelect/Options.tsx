import React, { FC, useEffect } from "react"
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
} from "react-native"
import { view, store } from "@risingstack/react-easy-state"
import { theme } from "@free/application/config/theme"
import { random } from "../../../helper/util"
import { tw } from "@free/tailwind"

const Option: FC<any> = view(
  ({ disabled = false, active = false, onPress, children }) => {
    return (
      <TouchableWithoutFeedback disabled={disabled} onPress={onPress}>
        <View
          style={StyleSheet.flatten([
            styles.rootOption,
            active ? styles.optionActive : {},
          ])}
        >
          <Text
            style={StyleSheet.flatten([
              styles.textOption,
              active ? styles.textActive : {},
            ])}
          >
            {children}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
)

export const useOptions = () => {
  const state = store({
    active: 0,
    onChangeActive: (n) => {},
    onEnter: () => {},
  })
  const Options: FC<any> = view((props) => {
    const { parent, input } = props
    const options = parent.options.filter((opt) =>
      parent.multi ? parent.value.indexOf(opt) < 0 : opt !== parent.value
    )
    const regex = new RegExp(input.query, "i")
    const filteredData = options.filter((d) => regex.test(d))
    const isNotFound = filteredData.length == 0
    const isCreatable = isNotFound && parent.creatable && input.query !== ""

    const onSelect = (value) => {
      parent.onChange(value)
      input.query = ""
    }

    useEffect(() => {
      state.active = isCreatable ? -1 : 0
    }, [isCreatable])

    state.onChangeActive = (n) => {
      if (isCreatable) {
        state.active = n == -1 ? -1 : 0
      } else if (
        !(
          (state.active == 0 && n == -1) ||
          (state.active == filteredData.length - 1 && n == 1)
        )
      ) {
        state.active = state.active + n
      }
    }

    state.onEnter = () => {
      onSelect(isCreatable ? input.query : filteredData[state.active])
    }

    return (
      <View style={styles.rootOptions}>
        {isNotFound ? (
          isCreatable ? (
            <Option
              active={state.active == 0}
              onPress={() => onSelect(input.query)}
            >
              {"Create : " + input.query}
            </Option>
          ) : (
            <Option disabled>No match found</Option>
          )
        ) : (
          <ScrollView keyboardShouldPersistTaps="handled">
            {filteredData.map((data, i) => {
              return (
                <Option
                  active={state.active == i}
                  key={"option_" + random()}
                  onPress={() => onSelect(data)}
                >
                  {data}
                </Option>
              )
            })}
          </ScrollView>
        )}
      </View>
    )
  })

  return {
    Options,
    onChangeActive: (n) => state.onChangeActive(n),
    onEnter: () => state.onEnter(),
  }
}

const styles: any = StyleSheet.create({
  rootOptions: tw("bg-white shadow-md", { maxHeight: 150 }),
  rootOption: tw(
    "flex-row p-3 border-solid border-t border-gray-400 items-center"
  ),
  optionActive: tw(`${theme.primary}`),
  textOption: tw("text-gray-700 leading-5 mx-2"),
  textActive: tw("text-white"),
})
