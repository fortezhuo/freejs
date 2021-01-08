import { useEffect, useMemo, useState } from "react"
import { debounce } from "./lib/debounce"
import { flattenOptions } from "./lib/flattenOptions"

export function useFetch(
  q: any,
  defaultOptions: JSONObject[],
  { debounceTime, filterOptions, getOptions, keyLabel }: any
) {
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState(() =>
    flattenOptions(defaultOptions, keyLabel)
  )
  const fetch = useMemo(() => {
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

  useEffect(() => setOptions(defaultOptions), [defaultOptions])
  useEffect(() => fetch(q), [fetch, q])

  return { options, setOptions, fetching }
}
