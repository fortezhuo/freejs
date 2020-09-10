const upload = {
  local: {
    // this ex for relative to server folder
    tempdir: "local_file_freejs/temp/",
    dir: "local_file_freejs/upload/",
    // can be use with fullpath or with '/' leading to relative to project folder
  },
  gdrive: {
    token_path: "D:/biz.prisma-solusi.com/local_file_freejs/token.json",
    // folder id https://drive.google.com/drive/u/0/folders/<folder-id>
    // ex: https://drive.google.com/drive/u/0/folders/1-dMlBj_hwBQi7wwgBdiIGghs7RfgT5pD
    // "1-dMlBj_hwBQi7wwgBdiIGghs7RfgT5pD" is folder id
    // default is upload to root directory
    drive_folder_id: [],
    scope: ["https://www.googleapis.com/auth/drive"],
    // below is copy of json credential from google console
    installed: {
      client_id:
        "176598936433-dtdlh2rbqga6ht8ghT7yhr5RDio9h6g0.apps.googleusercontent.com",
      project_id: "gdrivefreejs-1594590203511",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_secret: "svcxjZQrwkiXe4FgwfeQWFVz",
      redirect_uris: ["http://localhost/api/gdrive/token"],
    },
  },
}

module.exports = upload
