import { AccessControl } from "role-acl"
import { configACL } from "@free/env"

export const acl = new AccessControl(configACL)

export const asyncForEach = async (array: any[], callback: any) => {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array)
  }
}

export const isRGBLight = (color: string) => {
  const aColor = color.replace(/[rgba()]+/g, "").split(",")
  const brightness =
    (+aColor[0] * 299 + +aColor[1] * 587 + +aColor[2] * 114) / 1000

  return brightness > 198
}

export const getGlobal = function () {
  return (function (global) {
    return global
  })(new Function("return this;")())
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
