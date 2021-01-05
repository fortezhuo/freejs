import _flatten from "lodash/flattenDeep"

export class RBAC {
  protected rawOptions: JSONObject[] | undefined
  protected options: JSONObject[] | undefined
  protected context: JSONObject | undefined

  constructor(options?: JSONObject) {
    this.rawOptions = this.flatten(options)
  }

  load = (options: JSONObject) => {
    this.rawOptions = this.flatten(options)
  }

  flatten = (options?: JSONObject) => {
    return _flatten(
      Object.keys(options || {}).map((key: string) => {
        return (options || {})[key].map((opt: JSONObject) => ({
          ...opt,
          role: key,
        }))
      })
    )
  }
  register = (roles: string[], context: JSONObject) => {
    this.options = this.rawOptions?.filter(
      (opt: JSONObject) => roles.indexOf(opt.role) >= 0
    )
    this.context = context
  }

  can = (action: string, target: string) => {
    const access = (this.options || []).filter(
      (opt) =>
        (opt.action.indexOf("*") >= 0 || opt.action.indexOf(action) >= 0) &&
        opt.target === target
    )

    return access.length == 0
      ? { granted: false }
      : { granted: true, access: access[0], context: this.context }
  }
}
