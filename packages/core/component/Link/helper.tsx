const words = /Setting|View/gi

export const buildLink = (name: string, params: any) => {
  const path = name ? name.replace(words, "").toLowerCase() : ""
  return `/${path}${params ? "/" + params.id : ""}`
}
