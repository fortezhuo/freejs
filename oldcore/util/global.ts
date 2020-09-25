export const getGlobal = function () {
  return (function (global) {
    return global
  })(new Function("return this;")())
}
