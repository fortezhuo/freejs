import { BaseService } from "../base"
import { store } from "./store"
import * as gdrive from "./gdrive"
import { configGDrive } from "@free/env"
import { google } from "googleapis"

export class UploadService extends BaseService {
  public store: any
  public gapi: any
  public gapiOAuthClient: any
  public gdriveAuth: any
  public gdriveToken: any
  public gdriveStore: any
  constructor() {
    super("upload")
    this.disableAuth = true

    /* GDrive Enable */
    this.gapi = google
    this.gapiOAuthClient = new google.auth.OAuth2(
      configGDrive.client_id,
      configGDrive.client_secret,
      configGDrive.redirect_uris[0]
    )

    this.store = store.bind(this)
    this.gdriveAuth = gdrive.auth.bind(this)
    this.gdriveToken = gdrive.token.bind(this)
    this.gdriveStore = gdrive.store.bind(this)
  }
}
