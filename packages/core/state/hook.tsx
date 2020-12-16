import React from "react"
import constate from "constate"
import _isEmpty from "lodash/isEmpty"

export const createState = (init: ObjectAny) =>
  React.useReducer((prev: ObjectAny, _next: ObjectAny) => {
    let { __isReset, ...next } = _next
    __isReset = !!__isReset ? __isReset : _isEmpty(next)
    return __isReset ? next : { ...prev, ...next }
  }, init)

export const useDefaultState = ({ initData, initTemp }: any) => {
  const [data = {}, setData] = createState(initData)
  const [temp = {}, setTemp] = createState(initTemp)
  const [error = {}, setError] = createState({})

  return {
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