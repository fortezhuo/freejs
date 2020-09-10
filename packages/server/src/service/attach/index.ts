import { BaseService } from "../base"
import { upload } from "./upload"
export class AttachService extends BaseService {
  public upload: any
  constructor() {
    super("attach")
    this.disableAuth = true
    this.upload = upload.bind(this)
  }
}
