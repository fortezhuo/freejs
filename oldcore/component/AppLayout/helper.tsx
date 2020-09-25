export const getScreenSize = (width: number) => {
  if (width >= 1200) return "xl"
  if (width >= 992 && width < 1200) return "lg"
  if (width >= 768 && width < 992) return "md"
  if (width < 768) return "sm"
}
