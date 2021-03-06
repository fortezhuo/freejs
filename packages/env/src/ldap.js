const freeEnv = process.env.FREE_ENV || "default"
const ldap = {
  local: [
    {
      domain: "rockman.com",
      host: "ldap://0.0.0.0:389",
      base: "dc=ROCKMAN,dc=COM",
      filterKey: "sAMAccountName",
      username: "cn=admin,dc=ROCKMAN,dc=COM",
    },
  ],
  huahua: [
    {
      domain: "rockman.com",
      host: "ldap://0.0.0.0:389",
      base: "dc=ROCKMAN,dc=COM",
      filterKey: "sAMAccountName",
      username: "cn=admin,dc=ROCKMAN,dc=COM",
    },
    {
      domain: "forte.com",
      host: "ldap://0.0.0.0:389",
      base: "dc=ROCKMAN,dc=COM",
      filterKey: "sAMAccountName",
      username: "cn=admin,dc=ROCKMAN,dc=COM",
    },
    {
      domain: "bass.com",
      host: "ldap://0.0.0.0:389",
      base: "dc=ROCKMAN,dc=COM",
      filterKey: "sAMAccountName",
      username: "cn=admin,dc=ROCKMAN,dc=COM",
    },
    {
      domain: "protoman.com",
      host: "ldap://0.0.0.0:389",
      base: "dc=ROCKMAN,dc=COM",
      filterKey: "sAMAccountName",
      username: "cn=admin,dc=ROCKMAN,dc=COM",
    },
  ],
  nyanyaw: [
    {
      domain: "rockman.com",
      host: "ldap://0.0.0.0:389",
      base: "dc=ROCKMAN,dc=COM",
      filterKey: "sAMAccountName",
      username: "cn=admin,dc=ROCKMAN,dc=COM",
    },
  ],
  default: [
    {
      domain: "rockman.com",
      host: "ldap://0.0.0.0:389",
      base: "dc=ROCKMAN,dc=COM",
      filterKey: "sAMAccountName",
      username: "cn=admin,dc=ROCKMAN,dc=COM",
    },
  ],
}

module.exports = ldap[freeEnv]
