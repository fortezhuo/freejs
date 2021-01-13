import React from "react"
import constate from "constate"
import _isEmpty from "lodash/isEmpty"

const merge = (prev: JSONObject, _next: JSONObject) => {
  let { __isReset, ...next } = _next
  __isReset = !!__isReset ? __isReset : _isEmpty(next)
  return __isReset ? next : { ...prev, ...next }
}

export const useState = (init: JSONObject) => React.useReducer(merge, init)

export const createContext = (
  name: string,
  init: JSONObject,
  useState: any
) => {
  const [Provider, useHook] = constate(useState)

  Provider.displayName = `${name}.Provider`

  const withProvider: any = (Component: any) => {
    const Wrapper = (props: any) => {
      return (
        <Provider {...init}>
          <Component {...props} />
        </Provider>
      )
    }
    Wrapper.displayName = `withProvider.${name}`
    return Wrapper
  }

  return [withProvider, useHook]
}
