import { configUpload } from "@free/env"
import fs from "fs"
const { google } = require("googleapis")

export const createToken = () => {
  return new Promise(async (resolve, reject) => {
    const config = configUpload.gdrive
    const oAuth2Client = new google.auth.OAuth2(
      config.installed.client_id,
      config.installed.client_secret,
      config.installed.redirect_uris[0]
    )
    fs.readFile(config.token_path, async (err, token) => {
      if (err) {
        const authUrl = oAuth2Client.generateAuthUrl({
          access_type: "offline",
          scope: config.scope,
        })
        resolve({ authorize_url: authUrl })
      } else {
        resolve({
          message: "Credential has been setup",
          token_path: config.token_path,
        })
      }
    })
  })
}

export const setToken = (code: string) => {
  return new Promise(async (resolve, reject) => {
    const config = configUpload.gdrive
    const oAuth2Client = new google.auth.OAuth2(
      config.installed.client_id,
      config.installed.client_secret,
      config.installed.redirect_uris[0]
    )
    oAuth2Client.getToken(code, (err: Error, token: any) => {
      if (err) {
        reject({ error: "Error retrieving access token " + err })
      } else {
        oAuth2Client.setCredentials(token)
        fs.writeFile(config.token_path, JSON.stringify(token), (err) => {
          if (err) {
            reject({ error: err })
          } else {
            resolve({
              message: `GDrive token stored to : ${config.token_path}`,
            })
          }
        })
      }
    })
  })
}
