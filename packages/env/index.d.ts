type Config = {
  [key: string]: string
}

type ConfigServer = {
  host: string
  port: number
  firstTime: string
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

export const configLDAP: ConfigAny
export const configPlatform: ConfigAny
export const configServer: ConfigServer
export const configApp: Config
export const configSession: Config
export const configDatabase: Config
export const configProxy: string
export const configACL: ConfigAny
export const configMail: configMail
