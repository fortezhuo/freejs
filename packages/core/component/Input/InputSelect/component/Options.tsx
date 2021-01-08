import React from "react"
import { View, FlatList, Text } from "react-native"
import { OptionsList } from "./OptionsList"

export const Options: React.FC<any> = React.memo(
  ({ options, snapshot, onSelectOption, emptyMessage }) => {
    const refFlatList = React.useRef<FlatList>(null)
    const { value, highlighted } = snapshot
    const renderEmptyMessage = React.useCallback(() => {
      if (emptyMessage === null) {
        return null
      }

      return (
        <Text>
          {typeof emptyMessage === "function" ? emptyMessage() : emptyMessage}
        </Text>
      )
    }, [emptyMessage])

    React.useEffect(() => {
      if (refFlatList.current && !!highlighted && highlighted > 0) {
        refFlatList.current.scrollToIndex({ index: highlighted })
      }
      /*
      const { current } = selectRef

      if (
        !current ||
        (highlighted < 0 && Array.isArray(value)) ||
        value === null
      ) {
        return
      }

      const query =
        highlighted > -1
          ? `[data-index="${highlighted}"]`
          : `[data-value="${escape(value)}"]`
      const selected = current.querySelector(query)

      if (selected) {
        const rect = current.getBoundingClientRect()
        const selectedRect = selected.getBoundingClientRect()

        current.scrollTop =
          selected.offsetTop - rect.height / 2 + selectedRect.height / 2
      }
    }
    */
    }, [value, highlighted, refFlatList])

    return (
      <View style={{ maxHeight: 200, backgroundColor: "white" }}>
        {options.length ? (
          <OptionsList
            ref={refFlatList}
            keyLabel={snapshot.keyLabel}
            keyValue={snapshot.keyValue}
            onSelectOption={onSelectOption}
            snapshot={snapshot}
            options={options}
          />
        ) : (
          renderEmptyMessage()
        )}
      </View>
    )
  }
)
