import { GET } from "../../request"
import dayjs from "dayjs"

export const date = (date: any) => dayjs(date).format("DD MMM YYYY")
export const datetime = (datetime: any) =>
  dayjs(datetime).format("DD MMM YYYY HH:mm:ss")
export const download = async (path: string, name: string) => {
  const res = await GET(`${path}/${name}`, { responseType: "blob" })
  const url = window.URL.createObjectURL(new Blob([res.data]))
  const link = document.createElement("a")
  link.href = url
  link.setAttribute("download", name)
  document.body.appendChild(link)
  link.click()
  if (link.parentNode) {
    link.parentNode.removeChild(link)
  }
}
