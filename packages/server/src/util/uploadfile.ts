import { configUpload } from "@free/env"
import { attachment, saveTo } from "@free/upload"
import fs from "fs"
const { google } = require("googleapis")

export const uploadFile = (attachment: attachment, saveTo: saveTo) => {
  return new Promise(async (resolve, reject) => {
    let saveDir: any = []
    if (attachment?.constructor === Array) {
      for (const file of attachment) {
        try {
          let result
          if (saveTo === "local") {
            result = await saveFileLocal(file)
          } else {
            result = await saveFileGoogleDrive(file)
          }
          saveDir.push(result)
        } catch (error) {
          reject(error)
        }
      }
    } else if (attachment?.constructor === Object) {
      try {
        let result
        if (saveTo === "local") {
          result = await saveFileLocal(attachment)
        } else {
          result = await saveFileGoogleDrive(attachment)
        }
        saveDir.push(result)
      } catch (error) {
        reject(error)
      }
    } else if (!attachment?.constructor) {
      console.log("No file upload")
    } else {
      throw TypeError("Unsupported value for upload process.")
    }
    resolve(saveDir)
  })
}

const saveFileLocal = async (file: any) => {
  const config = configUpload.local
  return new Promise(async (resolve, reject) => {
    if (!fs.existsSync(config.dir)) fs.mkdirSync(config.dir)
    file
      .mv(config.dir + file.name)
      .then(() => {
        resolve(config.dir + file.name)
      })
      .catch((err: Error) => {
        reject(err)
      })
  })
}

const saveFileGoogleDrive = async (file: any) => {
  const config = configUpload.gdrive
  return new Promise(async (resolve, reject) => {
    const oAuth2Client = new google.auth.OAuth2(
      config.installed.client_id,
      config.installed.client_secret,
      config.installed.redirect_uris[0]
    )
    fs.readFile(config.token_path, async (err) => {
      if (err) console.log(err)
      const jsonToken = JSON.parse(fs.readFileSync(config.token_path, "utf8"))
      oAuth2Client.setCredentials(jsonToken)
      const result = await uploadToGDrive(oAuth2Client, file)
      fs.unlink(file.tempFilePath, (err) => {
        if (err) console.log(err)
        else
          console.log(
            `util/uploadfile.js: remove temporary files ${file.tempFilePath}`
          )
      })
      resolve(result)
    })
  })
}

const uploadToGDrive = (auth: any, file: any) => {
  const config = configUpload.gdrive
  return new Promise(async (resolve, reject) => {
    const drive = google.drive({ version: "v3", auth })
    const fileMetadata = {
      name: file.name,
      parents: config.drive_folder_id,
    }
    const media = {
      mimeType: file.mimetype,
      body: fs.createReadStream(file.tempFilePath),
    }
    drive.files.create(
      {
        resource: fileMetadata,
        media: media,
        fields: "id",
      },
      (err: Error, file: any) => {
        if (err) {
          console.error(err)
          reject(err)
        } else {
          console.log("Uploaded file Id: ", file.data.id)
          resolve(`https://drive.google.com/open?id=${file.data.id}`)
        }
      }
    )
  })
}
