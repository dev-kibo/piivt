import IConfig from "./IConfig.interface";

const Config: IConfig = {
  server: {
    baseUrl: "http://localhost:5000",
    port: 5000,
    static: {
      path: "static/",
      route: "/static",
      cacheControl: true,
      dotFiles: "deny",
      etag: true,
      maxAge: 3600000,
      index: false,
    },
  },
  logger: {
    path: "logs/access.log",
  },
  database: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mariadb",
    database: "piivt",
    charset: "utf8",
    timezone: "+01:00",
  },
  fileUpload: {
    maxSize: 5 * 1024 * 1024,
    tempDir: "../temp/",
    uploadDest: "static/uploads",
    photos: {
      resizes: [
        {
          sufix: "-small",
          fit: "cover",
          width: 182,
          height: 268,
        },
        {
          sufix: "-medium",
          fit: "cover",
          width: 319,
          height: 473,
        },
      ],
    },
  },
};

export default Config;
