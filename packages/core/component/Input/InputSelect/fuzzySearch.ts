import Fuse from "fuse.js"

export function fuzzySearch(options: JSONObject[]) {
  const fuse = new Fuse(options, {
    keys: ["name"],
    threshold: 0.3,
  })

  return (value: any) => {
    if (!value.length) {
      return options
    }

    console.log(value)

    console.log(fuse.search(value))

    return fuse.search(value)
  }
}
