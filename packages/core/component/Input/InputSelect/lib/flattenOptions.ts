export function flattenOptions(options: JSONObject[], keyLabel: string) {
  if (!Array.isArray(options)) {
    return []
  }

  const nextOptions: any = []

  options.forEach((option, index) => {
    if ("type" in option && option.type === "group") {
      const id = `${option[keyLabel]
        .replace(/\s+/g, "-")
        .toLowerCase()}-${index}`

      option.items.forEach((groupOption: JSONObject) => {
        nextOptions.push({
          ...groupOption,
          groupId: id,
          groupName: option[keyLabel],
        })
      })

      return
    }

    nextOptions.push({ ...option, index })
  })

  return nextOptions
}
