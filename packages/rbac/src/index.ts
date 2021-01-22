import _flatten from "lodash/flattenDeep"
import _uniq from "lodash/uniq"

export class RBAC {
  protected rawOptions: JSONObject | undefined
  protected options: JSONObject[] | undefined
  protected context: JSONObject | undefined

  constructor(options?: JSONObject) {
    this.rawOptions = flatten(options)
  }
  loadRaw = (options: JSONObject) => {
    this.rawOptions = flatten(options)
  }
  loadAccess = (listOption: JSONObject) => {
    this.options = listOption.options
    this.context = listOption.context
  }
  getAccess = (roles: string[], context: JSONObject) => {
    const options = this.rawOptions?.filter(
      (opt: JSONObject) => roles.indexOf(opt.role) >= 0
    )

    return { options, context }
  }

  can = (action: string, target: string, listOption?: JSONObject) => {
    const options = listOption?.options || this.options
    const context = listOption?.context || this.context

    const access = (options || []).find(
      (opt: JSONObject) =>
        (opt.can.indexOf("all") >= 0 || opt.can.indexOf(action) >= 0) &&
        opt.on === target
    )

    return access ? { granted: true, access, context } : { granted: false }
  }
}

const merge = (array: JSONObject[], role: string) => {
  const reducer = array.reduce((acc, obj) => {
    if (acc[obj.on]) {
      acc[obj.on].can = _uniq([...(acc[obj.on].can || []), ...(obj.can || [])])
    } else {
      acc[obj.on] = { ...obj, role: role }
    }

    return acc
  }, {})

  return [...Object.keys(reducer).map((key: string) => reducer[key])]
}

const flatten = (options?: JSONObject) => {
  return options
    ? _flatten(
        Object.keys(options).map((key: string) => {
          const { inherit: aInherit = [], list = [] } = options[key]
          return merge(
            list.concat(
              _flatten(aInherit.map((inherit: string) => options[inherit].list))
            ),
            key
          )
        })
      )
    : []
}
