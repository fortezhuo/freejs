import React from "react"
import { debounce } from "../lib/debounce"
import { flattenOptions } from "../lib/flattenOptions"

export function useFetch(
  q: any,
  defaultOptions: JSONObject[],
  { debounceTime, filterOptions, getOptions, keyLabel }: any
) {
  const [fetching, setFetching] = React.useState(false)
  const [options, setOptions] = React.useState(() =>
    flattenOptions(defaultOptions, keyLabel)
  )
  const fetch = React.useMemo(() => {
    const filter = filterOptions
      ? filterOptions(defaultOptions)
      : () => defaultOptions

    if (!getOptions) {
      return (s: any) => setOptions(flattenOptions(filter(s), keyLabel))
    }

    return debounce((s: any) => {
      const optionsReq = getOptions(s, defaultOptions)

      setFetching(true)

      Promise.resolve(optionsReq)
        .then((newOptions) => {
          if (filterOptions) {
            setOptions(flattenOptions(filterOptions(newOptions)(s), keyLabel))
          } else {
            setOptions(flattenOptions(newOptions, keyLabel))
          }
        })
        .finally(() => setFetching(false))
    }, debounceTime)
  }, [filterOptions, defaultOptions, getOptions, debounceTime])

  React.useEffect(() => setOptions(defaultOptions), [defaultOptions])
  React.useEffect(() => fetch(q), [fetch, q])

  return { options, setOptions, fetching }
}
