import _flatten from "lodash/flattenDeep"
import _uniq from "lodash/uniq"

const mergeTarget = (array: JSONObject[], role: string) => {
  const reducer = array.reduce((acc, obj) => {
    if (acc[obj.target]) {
      acc[obj.target].action = _uniq([
        ...(acc[obj.target].action || []),
        ...(obj.action || []),
      ])
    } else {
      acc[obj.target] = { ...obj, role: role }
    }

    return acc
  }, {})

  return [...Object.keys(reducer).map((key: string) => reducer[key])]
}
export class RBAC {
  protected rawOptions: JSONObject | undefined
  protected options: JSONObject[] | undefined
  protected context: JSONObject | undefined

  constructor(options?: JSONObject) {
    this.rawOptions = this.flatten(options)
    console.log(this.rawOptions)
  }

  load = (options: JSONObject) => {
    this.rawOptions = this.flatten(options)
  }

  flatten = (options?: JSONObject) => {
    return options
      ? _flatten(
          Object.keys(options || {}).map((key: string) => {
            const { inherit: aInherit = [], list = [] } = (options || {})[key]
            return mergeTarget(
              list.concat(
                _flatten(
                  aInherit.map((inherit: string) => options[inherit].list)
                )
              ),
              key
            )
          })
        )
      : []
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
