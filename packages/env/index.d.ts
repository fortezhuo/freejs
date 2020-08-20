type Config = {
  [key: string]: string
}

type ConfigServer = {
  host: string
  port: number
  firstTime: string
}

type ConfigLDAP = {
  [key: string]: any
}

export const configLDAP: ConfigLDAP
export const configServer: ConfigServer
export const configApp: Config
export const configSession: Config
export const configDatabase: Config
