type Config = {
  [key: string]: string
}

type ConfigServer = {
  host: string
  port: number
}

type ConfigAny = {
  [key: string]: any
}

type ConfigMail = {
  from: string
  mail: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

type configUpload = {
  local: {
    tempdir: string
    dir: string
  }
  gdrive: {
    token_path: array
    drive_folder_id: string
    scope: array
    installed: {
      client_id: string
      client_secret: string
      redirect_uris: array
    }
  }
}

export const configLDAP: ConfigAny
export const configPlatform: ConfigAny
export const configServer: ConfigServer
export const configApp: Config
export const configSession: Config
export const configDatabase: Config
export const configProxy: string
export const configMail: configMail
export const configGDrive: configAny
