import Axios from "axios"
import { platform } from "../config/platform"

const axios = Axios.create({
  baseURL: platform.baseURL,
})

export const get = function (url: string) {
  return axios.get(url)
}
