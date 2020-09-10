import { BaseService } from "../base"
import { Request } from "@free/server"
import { upload } from "./upload"

export class UploadFileServices extends BaseService {
  public upload: any
  constructor() {
    super()
    this.upload = upload.bind(this)
  }
}
