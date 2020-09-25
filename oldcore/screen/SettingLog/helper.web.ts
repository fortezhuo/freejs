import { get } from "../../request"

export const download = async (name: string) => {
  const res = await get(`/api/log/${name}`, { responseType: "blob" })
  const url = window.URL.createObjectURL(new Blob([res.data]))
  const link = document.createElement("a")
  link.href = url
  link.setAttribute("download", `${name}.log`)
  document.body.appendChild(link)
  link.click()
  if (link.parentNode) {
    link.parentNode.removeChild(link)
  }
}
