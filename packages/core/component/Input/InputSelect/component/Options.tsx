import React from "react"
import { View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { MenuItem } from "../../../Menu"
import { OptionsList } from "./OptionsList"

export const Options: React.FC<any> = React.memo(
  ({ options, snapshot, onSelectOption, emptyMessage }) => {
    const selectRef = React.useRef(null)
    const { value, highlighted } = snapshot
    const renderEmptyMessage = React.useCallback(() => {
      if (emptyMessage === null) {
        return null
      }

      return (
        <MenuItem disabled>
          {typeof emptyMessage === "function" ? emptyMessage() : emptyMessage}
        </MenuItem>
      )
    }, [emptyMessage])

    /*
  useEffect(() => {
    if (Platform.OS === "web") {
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
  }, [value, highlighted, selectRef])
  */

    return (
      <View style={{ maxHeight: 200, backgroundColor: "white" }}>
        {options.length ? (
          <OptionsList
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
