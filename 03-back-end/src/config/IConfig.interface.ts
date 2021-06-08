export default interface IConfig {
  server: {
    baseUrl: string;
    port: number;
    static: {
      path: string;
      route: string;
      cacheControl: boolean;
      dotFiles: string;
      etag: boolean;
      maxAge: number;
      index: boolean;
    };
  };
  logger: {
    path: string;
  };
  database: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    charset: string;
    timezone: string;
  };
  fileUpload: {
    maxSize: number;
    tempDir: string;
    uploadDest: string;
    photos: {
      resizes: {
        sufix: string;
        width: number;
        height: number;
        fit: "cover" | "contain";
      }[];
    };
  };
  accessToken: {
    secret: string;
    issuer: string;
    duration: number;
  };
}
