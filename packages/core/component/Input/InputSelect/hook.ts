import { useEffect } from "react"
import { Platform } from "react-native"
import { useMenu, useDialog } from "../.."
import { useLocalObservable } from "mobx-react-lite"

export const useWrapper = () => {
  const isMobile = Platform.OS !== "web"
  const wrapper: any = isMobile ? useDialog() : useMenu()

  return {
    Wrapper: wrapper.Dialog ? wrapper.Dialog : wrapper.Menu,
    show: wrapper.show,
    hide: wrapper.hide,
    isMobile,
  }
}

export const useHook = (refScroll: any, props: any) => {
  const {
    creatable = false,
    options: _options,
    disabled: _disabled,
    onChange: _onChange,
    model = "data",
    placeholder = "Select ...",
    singleValue = true,
    keyValue = "value",
    keyLabel = "label",
    store,
    name,
    multi,
  } = props
  const state = useLocalObservable(() => {
    return {
      _options,
      _temp: undefined,
      _isMobileShow: false,
      model,
      creatable,
      placeholder,
      name,
      isMobile: Platform.OS !== "web",
      multi,
      keyValue,
      keyLabel,
      singleValue,
      search: "",
      set(args: { [key: string]: any }) {
        Object.keys(args).forEach((key: string) => {
          ;(state as any)[key] = args[key]
        })
      },
      setSearch(search: string) {
        state.search = search
      },
      index: 0,
      setIndex(index: number) {
        state.index = index
        refScroll.current?.scrollTo({ y: index * 30 })
      },
      options: [],
      setOptions(options: any) {
        state.options = options
      },
      async onSelect(option: any) {
        if (option) {
          const { multi, _isMobileShow } = state
          const value = _isMobileShow ? state._temp : state.value
          const options = multi ? value.concat([option]) : option
          state.index = 0
          if (_isMobileShow) {
            state.set({ _temp: options })
          } else {
            await state.onChange(options)
          }
        }
      },
      async onClear(display: string) {
        const { keyLabel, _isMobileShow } = state
        const value = _isMobileShow ? state._temp : state.value
        const options = value.filter(
          (_value: any) => _value[keyLabel] !== display
        )
        if (_isMobileShow) {
          state.set({ _temp: options })
        } else {
          await state.onChange(options)
        }
      },
      async onChange(options: any) {
        const singleValue = state.singleValue
        const setValue = (args: any) =>
          model === "data" ? store.setData(args) : store.setTemp(args)
        if (!singleValue) {
          setValue({ [`${state.name}_data`]: options ? options : undefined })
        }
        setValue({
          [state.name]: options
            ? state.multi
              ? options.map((opt: any) => (opt ? opt[state.keyValue] : "err"))
              : options.value
            : undefined,
        })
        if (_onChange) await _onChange()
      },
      onShow() {
        if (state.isMobile) {
          state._isMobileShow = true
          state._temp = state.value
        } else {
          state._isMobileShow = false
          state._temp = undefined
        }
      },
      get value() {
        const { singleValue, keyValue, keyLabel, multi } = state
        let _value = store[model].get(singleValue ? name : `${name}_data`)
        _value = multi ? _value || [] : _value

        return !singleValue
          ? _value
          : multi
          ? _value.map((v: string) => ({ [keyLabel]: v, [keyValue]: v }))
          : { [keyLabel]: _value, [keyValue]: _value }
      },
      get display() {
        const { keyLabel, multi, _isMobileShow } = state
        let _value = _isMobileShow ? state._temp : state.value
        return multi
          ? _value.map((v: any) => v[keyLabel])
          : _value[keyLabel] || ""
      },
      get disabled() {
        return _disabled || store.isUpdating
      },
      get isLoading() {
        return store.isLoading
      },
    }
  })

  useEffect(() => {
    state.set({ _options, multi })
  }, [_options, multi])

  return state
}
