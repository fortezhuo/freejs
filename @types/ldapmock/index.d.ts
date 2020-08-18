declare module "@free/ldapmock" {
  type LDAPData = {
    dn: string
    attributes: {
      [key: string]: string
    }
  }
}
