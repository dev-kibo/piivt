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
};

export default Config;
