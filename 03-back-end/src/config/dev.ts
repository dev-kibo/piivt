import IConfig from "./IConfig.interface";

const Config: IConfig = {
  server: {
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
};

export default Config;
