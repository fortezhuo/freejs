export const isRGBLight = (color: string) => {
  const aColor = color.replace(/[rgba()]+/g, "").split(",")
  const brightness =
    (+aColor[0] * 299 + +aColor[1] * 587 + +aColor[2] * 114) / 1000

  return brightness > 198
}
