declare module "@free/mock" {
  type LDAPData = {
    dn: string
    attributes: {
      [key: string]: string
    }
  }
}
