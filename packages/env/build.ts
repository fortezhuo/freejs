import fs from "fs"
import { configLDAP, configPlatform as platform } from "./"

const freeEnv = process.env.FREE_ENV || "default"
const createPlatform = (os: string) => {
  const template = `export const platform = {
  baseURL:"${os === "web" ? "" : platform[os].baseURL}"
}`
  return template
}

const createLDAP = () => {
  const template = `export const ldap = ${JSON.stringify(configLDAP)}`
  return template
}

const writePlatformFile = (os: string) => {
  fs.writeFile(
    `../core/config/platform${os === "web" ? "" : `.${os}`}.ts`,
    createPlatform(os),
    (err) => {
      if (err) {
        console.log(
          `Failed to create file platform : ${os} for : ${freeEnv}`,
          err
        )
      } else {
        console.log(`File platform : ${os} for : ${freeEnv} created`)
      }
    }
  )
}

const writeLDAPFile = () => {
  fs.writeFile(`../core/config/ldap.ts`, createLDAP(), (err) => {
    if (err) {
      console.log(`Failed to create file ldap for : ${freeEnv}`, err)
    } else {
      console.log(`File ldap for : ${freeEnv} created`)
    }
  })
}

writePlatformFile("web")
writePlatformFile("ios")
writePlatformFile("android")
writeLDAPFile()
