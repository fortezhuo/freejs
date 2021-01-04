type LDAPData = {
  dn: string
  attributes: {
    [key: string]: string
  }
}

export const database: Array<LDAPData> = [
  {
    dn: "cn=forte,dc=ROCKMAN,dc=COM",
    attributes: {
      cn: "forte",
      sAMAccountName: "forte",
      displayName: "Forte",
      mail: "forte@rockman.com",
    },
  },
  {
    dn: "cn=rockman,dc=ROCKMAN,dc=COM",
    attributes: {
      cn: "rockman",
      sAMAccountName: "rockman",
      displayName: "Rockman",
      mail: "forte@rockman.com",
    },
  },
  {
    dn: "cn=user_one,dc=ROCKMAN,dc=COM",
    attributes: {
      cn: "user_one",
      sAMAccountName: "user_one",
      displayName: "User One",
      mail: "use_one@rockman.com",
    },
  },
  {
    dn: "cn=user_two,dc=ROCKMAN,dc=COM",
    attributes: {
      cn: "user_two",
      sAMAccountName: "user_two",
      displayName: "User Two",
      mail: "use_two@rockman.com",
    },
  },
]
