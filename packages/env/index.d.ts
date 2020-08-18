type Config = {
  [key: string]: string
}

type ConfigServer = {
  host: string
  port: number
  firstTime: string
}

export const configLDAP: Config
export const configServer: ConfigServer
export const configApp: Config
export const configSession: Config
export const configDatabase: Config
