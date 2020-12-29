import React from "react"
import constate from "constate"
import _isEmpty from "lodash/isEmpty"

const merge = (prev: JSONObject, _next: JSONObject) => {
  let { __isReset, ...next } = _next
  __isReset = !!__isReset ? __isReset : _isEmpty(next)
  return __isReset ? next : { ...prev, ...next }
}

export const useState = (init: JSONObject) => React.useReducer(merge, init)

export const useDefaultState = ({ initData, initTemp }: any) => {
  const [state = {}, setState] = useState({})
  const [data = {}, setData] = useState(initData)
  const [temp = {}, setTemp] = useState(initTemp)
  const [error = {}, setError] = useState({})

  return {
    state,
    setState,
    data,
    setData,
    temp,
    setTemp,
    error,
    setError,
  }
}

export const createContext = (
  name: string,
  { initData, initTemp }: any,
  useState = useDefaultState
) => {
  const [Provider, useHook] = constate(useState)

  Provider.displayName = `${name}.Provider`

  const withProvider: any = (Component: any) => {
    const Wrapper = (props: any) => {
      return (
        <Provider {...{ initData, initTemp }}>
          <Component {...props} />
        </Provider>
      )
    }
    Wrapper.displayName = `withProvider.${name}`
    return Wrapper
  }

  return [withProvider, useHook]
}
