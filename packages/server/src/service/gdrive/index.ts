import { BaseService } from "../base"
import { Request } from "@free/server"
import { gdriveSetup, gdriveSetToken } from "./gdrive"

export class GoogleDriveServices extends BaseService {
  public gdriveSetup: any
  public gdriveSetToken: any

  constructor() {
    super()
    this.gdriveSetup = gdriveSetup.bind(this)
    this.gdriveSetToken = gdriveSetToken.bind(this)
  }
}
