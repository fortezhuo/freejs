import dayjs from "dayjs"

export const download = async (path: string, saveAs: string) => {}
export const date = (date: any) => dayjs(date).format("DD MMM YYYY")
export const datetime = (datetime: any) =>
  dayjs(datetime).format("DD MMM YYYY HH:mm:ss")
