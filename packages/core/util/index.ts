import { AccessControl } from "role-acl"
import { configACL, configApp } from "@free/env"
import dayjs from "dayjs"
import _isArray from "lodash/isArray"

const regexDate = /^\d{4}-\d{2}-\d{2}/

export const acl = new AccessControl(configACL)

export const asyncForEach = async (array: any[], callback: any) => {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array)
  }
}

export const getGlobal = function () {
  return (function (global) {
    return global
  })(new Function("return this;")())
}

export const registerForteApp = function (cb: any) {
  const global = getGlobal()
  const name = `${configApp.name}`
  let { [name]: app } = global.forte || {}
  global.forte = {
    [name]: { ...app, ...cb },
  }
}

export const getScreenSize = (width: number) => {
  if (width >= 1200) return "xl"
  if (width >= 992 && width < 1200) return "lg"
  if (width >= 769 && width < 992) return "md"
  if (width < 769) return "sm"
}

export const random = (n: number = 8) =>
  Math.random().toString(36).substring(2, n) +
  Math.random().toString(36).substring(2, n)

// IS
export const isArray = _isArray

export const isDateString = (value: any) => regexDate.test(`${value}`)

export const isRGBLight = (color: string) => {
  const aColor = color.replace(/[rgba()]+/g, "").split(",")
  const brightness =
    (+aColor[0] * 299 + +aColor[1] * 587 + +aColor[2] * 114) / 1000

  return brightness > 198
}

// DATE
export const formatDate = (value: any) => dayjs(value).format("DD MMM YYYY")
export const formatTime = (value: any) => dayjs(value).format("HH:mm")
export const formatDateTime = (value: any) =>
  dayjs(value).format("DD MMM YYYY HH:mm:ss")
export const formatString = (value: any) => {
  return isArray(value)
    ? typeof value[0] === "string" || typeof value[0] === "undefined"
      ? JSON.stringify(value)
      : JSON.stringify(value, null, 2)
    : value
}
