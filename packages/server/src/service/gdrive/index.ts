import { BaseService } from "../base"
import { gdriveSetup, gdriveSetToken } from "./gdrive"

export class GoogleDriveServices extends BaseService {
  public gdriveSetup: any
  public gdriveSetToken: any

  constructor() {
    super("gdrive")
    this.gdriveSetup = gdriveSetup.bind(this)
    this.gdriveSetToken = gdriveSetToken.bind(this)
  }
}
