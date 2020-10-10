import React, { forwardRef, useRef, useEffect } from "react"
import { Icon } from "../../component/Icon"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { theme } from "../../config/theme"
import { tw, color } from "@free/tailwind"

const defaultColor = color(theme.default_text)

export const Checkbox = forwardRef(
  ({ indeterminate, checked, onChange }: any, ref) => {
    const defaultRef = useRef()
    const resolvedRef: any = ref || defaultRef

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <TouchableOpacity ref={resolvedRef} onPress={onChange}>
        <View style={styles.viewCheckbox}>
          <Icon
            name={checked ? "check-square" : "square"}
            color={defaultColor}
            size={18}
          />
        </View>
      </TouchableOpacity>
    )
  }
)

const styles = StyleSheet.create({
  viewCheckbox: { paddingTop: 1, ...tw("h-6") },
})
