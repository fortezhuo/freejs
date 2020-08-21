import { Platform } from "react-native"
import { toJS } from "mobx"
import { platform } from "../config/platform"

export const getGlobal = function () {
  return (function (global) {
    return global
  })(new Function("return this;")())
}
