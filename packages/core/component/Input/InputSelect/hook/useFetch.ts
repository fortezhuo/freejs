import React from "react"
import { debounce } from "../lib/debounce"

export function useFetch(
  q: any,
  defaultOptions: JSONObject[],
  { debounceTime, filterOptions, loadOptions }: any
) {
  const [fetching, setFetching] = React.useState(false)
  const [options, setOptions] = React.useState(() => defaultOptions)
  const fetch = React.useMemo(() => {
    const filter = filterOptions
      ? filterOptions(defaultOptions)
      : () => defaultOptions

    if (!loadOptions) {
      return (s: any) => setOptions(filter(s))
    }

    return debounce((s: any) => {
      const optionsReq = loadOptions(s, defaultOptions)

      setFetching(true)

      Promise.resolve(optionsReq)
        .then((newOptions) => {
          if (filterOptions) {
            setOptions(filterOptions(newOptions)(s))
          } else {
            setOptions(newOptions)
          }
        })
        .finally(() => setFetching(false))
    }, debounceTime)
  }, [filterOptions, defaultOptions, loadOptions, debounceTime])

  React.useEffect(() => setOptions(defaultOptions), [defaultOptions])
  React.useEffect(() => fetch(q), [fetch, q])

  return { options, setOptions, fetching }
}
