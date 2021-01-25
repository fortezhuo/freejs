import map from "./map.json"

const mapMaker = (glyphMap: JSONObject) =>
  Object.keys(glyphMap)
    .map((key) => {
      return {
        key,
        value: String.fromCharCode(parseInt(glyphMap[key])),
      }
    })
    .reduce((map: JSONObject, glyphMap) => {
      map[glyphMap.key] = glyphMap.value
      return map
    }, {})

export const glyph: JSONObject = mapMaker(map)
